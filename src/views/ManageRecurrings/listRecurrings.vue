<template>
   <div>
      <!-- <p>{{ getActiveTab }}</p>
      <input
         type="text"
         v-model="activeTab"
         id=""
         placeholder="enter active tab"
      /> -->
      <!-- <button type="submit" @click="setActibeTabData">Submit</button> -->
      <CButton class="bg-secondary mt-2 mb-4" @click="addNewRecurring">
         Add New
      </CButton>

      <div class="tableResponsive">
         <table class="table">
            <!-- <loading :active.sync="isLoading"></loading> -->
            <vue-element-loading
               :active="isLoading"
               spinner="bar-fade-scale"
               color="#3c8dbc"
            />
            <thead>
               <tr class="card-border-top">
                  <th scope="col" @click="stringSort('title')">
                     title
                     <i
                        class="cil-arrow-bottom"
                        v-show="isSrtingSortClick == false"
                     ></i>
                     <i
                        class="cil-arrow-top"
                        v-show="isSrtingSortClick == true"
                     ></i>
                  </th>
                  <th scope="col" @click="floatSort('amount')">
                     amount
                     <i
                        class="cil-arrow-bottom"
                        v-show="isfloatSortClick == false"
                     ></i>
                     <i
                        class="cil-arrow-top"
                        v-show="isfloatSortClick == true"
                     ></i>
                  </th>

                  <th scope="col" @click="floatSort('rate')">
                     rate
                     <i
                        class="cil-arrow-bottom"
                        v-show="isfloatSortClick == false"
                     ></i>
                     <i
                        class="cil-arrow-top"
                        v-show="isfloatSortClick == true"
                     ></i>
                  </th>
                  <th scope="col" @click="stringSort('turnus')">
                     turnus
                     <i
                        class="cil-arrow-bottom"
                        v-show="isSrtingSortClick == false"
                     ></i>
                     <i
                        class="cil-arrow-top"
                        v-show="isSrtingSortClick == true"
                     ></i>
                  </th>
                  <th scope="col" @click="stringSort('expense')">
                     expense
                     <i
                        class="cil-arrow-bottom"
                        v-show="isSrtingSortClick == false"
                     ></i>
                     <i
                        class="cil-arrow-top"
                        v-show="isSrtingSortClick == true"
                     ></i>
                  </th>
                  <th scope="col" @click="floatSort('partPayment')">
                     Action
                  </th>
               </tr>
            </thead>
            <tbody>
               <tr v-for="item in datas" :key="item.id">
                  <td>{{ item.title }}</td>
                  <td>
                     {{
                        new Intl.NumberFormat("de-DE", {
                           style: "currency",
                           currency: "EUR",
                        }).format(parseFloat(item.amount))
                     }}
                  </td>
                  <td>
                     {{
                        new Intl.NumberFormat("de-DE", {
                           style: "currency",
                           currency: "EUR",
                        }).format(parseFloat(item.rate))
                     }}
                  </td>
                  <td>
                     {{
                        new Intl.NumberFormat("de-DE", {
                           style: "currency",
                           currency: "EUR",
                        }).format(parseFloat(item.turnus))
                     }}
                  </td>

                  <td>
                     {{
                        new Intl.NumberFormat("de-DE", {
                           style: "currency",
                           currency: "EUR",
                        }).format(parseFloat(item.expense || 0))
                     }}
                  </td>
                  <td class="p-0 align-middle">
                     <div
                        class="btn-group "
                        role="group"
                        aria-label="First group"
                     >
                        <button type="button" class="btn btn-secondary ">
                           <i class="cil-data-transfer-down " color="black"></i>
                        </button>
                        <a v-bind:href="'/recurrings/update/' + item.id"
                           ><button type="button" class="btn btn-primary ">
                              <i class="cil-featured-playlist"></i></button
                        ></a>
                        <button
                           type="button"
                           class="btn btn-danger"
                           @click="DeleteItem(item.id)"
                        >
                           <i class="cil-bank"></i>
                        </button>
                     </div>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
      <CPagination
         v-if="hasPagination"
         :activePage.sync="page"
         :pages="totalPages"
         @update:activePage="paginateHandler"
      />
   </div>
</template>

<script>
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
import VueElementLoading from "vue-element-loading";
import { mapActions, mapGetters } from "vuex";
const perPage = 20;
export default {
   name: "waithingForPayment",
   components: {
      Loading,
      VueElementLoading,
   },
   data: () => ({
      isLoading: false,
      datas: "",
      page: 1,
      totalItems: 0,
      totalPages: 0,
      isfloatSortClick: true,
      isSrtingSortClick: true,
      isActive: true,
      activeTab: 0,
   }),
   mounted() {
      this.getRecurrings();
   },

   computed: {
      hasPagination() {
         return this.totalPages > 1;
      },
      ...mapGetters(["getActiveTab"]),
   },
   methods: {
      addNewRecurring() {
         // alert("call")
         this.$router.push("/offers/6");
      },
      DeleteItem(id) {
         this.axios.delete("/recurrings/" + id).then((res) => {
            if (res.status == 200) {
               this.getRecurrings();
            }
         });
      },
      ...mapActions(["SetActiveTab"]),
      setActibeTabData() {
         this.SetActiveTab(this.activeTab);
         // alert(this.activeTab);
      },
      getDaysFromSpecificDate(forwardDate) {
         const fd = new Date(forwardDate);
         const now = new Date();
         const diff = Math.floor((now - fd) / (1000 * 60 * 60 * 24)); // days

         return diff;
      },

      paginateHandler(activePage) {
         this.getRecurrings({ page: activePage });
      },

      getRecurrings(params) {
         this.isLoading = true;
         this.axios
            .get("/recurrings", {
               params,
            })
            .then((res) => {
               if (res.status == 200) {
                  this.isLoading = false;
                  this.datas = res.data.data;
                  console.log(this.datas);
                  this.totalItems = res.data.total;
                  this.totalPages = Math.ceil(this.totalItems / perPage);
               }
            });

         window.scrollTo({
            top: 0,
            behavior: "smooth",
         });
      },

      floatSort(value) {
         this.isActive = !this.isActive;
         if (this.isfloatSortClick) {
            this.datas = this.datas.sort((a, b) => a[value] - b[value]);
            this.isfloatSortClick = !this.isfloatSortClick;
         } else {
            this.datas = this.datas.sort((a, b) => b[value] - a[value]);
            this.isfloatSortClick = !this.isfloatSortClick;
         }
         console.log(this.datas);
      },
      stringSort(value) {
         if (this.isSrtingSortClick) {
            this.datas = this.datas.sort((a, b) =>
               a[value] < b[value] ? -1 : 1
            );
            this.isSrtingSortClick = !this.isSrtingSortClick;
         } else {
            this.datas = this.datas.sort((a, b) =>
               a[value] > b[value] ? -1 : 1
            );
            this.isSrtingSortClick = !this.isSrtingSortClick;
         }
         console.log(this.datas);
      },
   },
};
</script>

<style scoped>
.card-border-top {
   border-bottom: 1px solid #000000;
}

/* 
.table td:after {
    content: "€";
} */
.arrowDown {
   position: relative;
}
.arrowDown::after {
   content: url("../icons/down-arrow.svg");
   width: 9px;
   display: block;
   position: absolute;
   top: 30%;
   left: 70%;
}
.active {
   position: relative;
}
.active::after {
   content: url("../icons/up-arrow.svg");
   width: 9px;
   display: block;
   position: absolute;
   top: 30%;
   left: 70%;
}
.card-border-top th {
   cursor: pointer;
}
table tr:nth-child(1) th {
   border-bottom: 2px solid #000000;
}
.tableResponsive {
   overflow-x: auto;
   -webkit-overflow-scrolling: touch;
}
</style>
