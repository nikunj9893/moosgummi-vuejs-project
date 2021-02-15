<template>
   <div>
      <!-- <p>{{ getActiveTab }}</p>
      <input
         type="text"
         v-model="activeTab"
         id=""
         placeholder="enter active tab"
    />-->
      <!-- <button type="submit" @click="setActibeTabData">Submit</button> -->

      <div class="border mt-2">
         <div class="btn-align">
            <CButton class="bg-secondary mt-3 ml-3 mb-4" @click="reloadData"
               >Reset</CButton
            >
            <a :href="'/contacts/create/' + debitor_id" class="mr-3">
               <CButton class="bg-secondary mt-3 ml-3 mb-4">
                  <i class="cil-plus">Create</i>
               </CButton>
            </a>

            <!-- <CButton class="bg-secondary mt-3 ml-3 mb-4" @click="createcontact"> 
                  <i class="cil-plus">Create</i>
               </CButton> -->
         </div>

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
                        Id
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
                        Gender
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
                        Name
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
                        Customer
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
                        Email
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
                        invoice contact
                     </th>
                     <th scope="col" @click="floatSort('partPayment')">
                        Contract contact
                     </th>
                     <th scope="col" @click="floatSort('partPayment')">
                        technical contact
                     </th>
                     <th scope="col" @click="floatSort('partPayment')">
                        Action
                     </th>
                  </tr>
               </thead>
               <tbody>
                  <tr v-for="item in datas" :key="item.id">
                     <td>{{ item.id }}</td>
                     <td>{{ item.gender }}</td>
                     <td>{{ `${item.prename} ${item.surname}` }}</td>
                     <td>{{ custome_name }}</td>
                     <td>{{ item.email }}</td>
                     <td>{{ item.invoice_contact }}</td>
                     <td>{{ item.contract_contact }}</td>
                     <td>{{ item.technical_contact }}</td>
                     <td class="p-0 align-middle">
                        <div
                           class="btn-group"
                           role="group"
                           aria-label="First group"
                        >
                           <button
                              type="button"
                              class="btn btn-secondary"
                              @click="updateContact(item.id)"
                           >
                              <i class="fa fa-edit"></i>
                           </button>
                           <button
                              type="button"
                              class="btn btn-danger"
                              @click="Deletecontact(item.id)"
                           >
                              <i class="fa fa-trash"></i>
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
      debitor_id: "",
      custome_name: "",
   }),
   mounted() {
      this.debitor_id = this.$route.params.debitor_id;
      this.custome_name = this.$route.params.name;

      this.getDebitorContacts();
   },

   computed: {
      hasPagination() {
         return this.totalPages > 1;
      },
      ...mapGetters(["getActiveTab"]),
   },
   methods: {
      reloadData() {
         this.getDebitorContacts();
      },
      updateContact(id) {
         this.$router.push("/contacts/edit/" + id);
      },
      addNewRecurring() {
         // alert("call")
         this.$router.push("/offers/6");
      },
      Deletecontact(id) {
         if (confirm("Do you really want to delete?")) {
            this.axios.delete("/contacts/" + id).then((res) => {
               if (res.status == 200) {
                  this.getDebitorContacts();
               }
            });
         }
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
         this.getDebitorContacts({ page: activePage });
      },

      getDebitorContacts(params) {
         this.isLoading = true;
         this.axios
            .get("/debitors/" + this.debitor_id + "/contacts", {
               params,
            })
            .then((res) => {
               if (res.status == 200) {
                  this.isLoading = false;
                  this.datas = res.data.data;
                  for (let i = 0; i < this.datas.length; i++) {
                     if (this.datas[i].technical_contact == true)
                        this.datas.technical_contact = "No";
                     else this.datas[i].technical_contact = "Yes";

                     if (this.datas[i].contract_contact == true)
                        this.datas.contract_contact = "No";
                     else this.datas[i].contract_contact = "Yes";

                     if (this.datas[i].invoice_contact == true)
                        this.datas.invoice_contact = "No";
                     else this.datas[i].invoice_contact = "Yes";

                     if (this.datas[i].gender == true)
                        this.datas[i].gender = "Mr.";
                     else this.datas[i].gender = "Mrs.";
                  }
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
.btn-align {
   display: flex;
   align-items: center;
   justify-content: space-between;
}
</style>
