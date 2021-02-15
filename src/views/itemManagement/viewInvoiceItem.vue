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

    <h5 class="pb-2">Open items</h5>
    <CCard class="pl-2 card-border-top">
      <div class="tableResponsive">
        <table class="table">
          <!-- <loading :active.sync="isLoading"></loading> -->
          <vue-element-loading :active="isLoading" spinner="bar-fade-scale" color="#3c8dbc" />
          <thead>
            <tr>
              <th scope="col">Last Update</th>

              <th scope="col" @click="stringSort('invoice_no')">
                Title
                <i class="cil-arrow-bottom" v-show="isSrtingSortClick == false"></i>
                <i class="cil-arrow-top" v-show="isSrtingSortClick == true"></i>
              </th>
              <th scope="col" @click="floatSort('invoice_no')">
                Price
                <i class="cil-arrow-bottom" v-show="isfloatSortClick == false"></i>
                <i class="cil-arrow-top" v-show="isfloatSortClick == true"></i>
              </th>
              <th scope="col" @click="floatSort('contact_name')">
                Amount
                <i class="cil-arrow-bottom" v-show="isSrtingSortClick == false"></i>
                <i class="cil-arrow-top" v-show="isSrtingSortClick == true"></i>
              </th>
              <th scope="col" @click="floatSort('netto_sum')">
                Invoice
                <i class="cil-arrow-bottom" v-show="isfloatSortClick == false"></i>
                <i class="cil-arrow-top" v-show="isfloatSortClick == true"></i>
              </th>
              <th scope="col" @click="stringSort('brutto_sum')">
                Offer
                <i class="cil-arrow-bottom" v-show="isfloatSortClick == false"></i>
                <i class="cil-arrow-top" v-show="isfloatSortClick == true"></i>
              </th>
              <th scope="col" @click="floatSort('partPayment')">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in datas" :key="item.id">
              <td class="p-0 align-middle">
                {{ item.debitor.updated_at | dtFormat('DD-MM-YY')  }} {{item.debitor.updated_at | dtFormat('h:m:s')}}
                <!-- {{}} -->
                <!-- {{ new Date(item.debitor.updated_at.replace(/-/g,"/"))}} -->
              </td>

              <td>{{ item.items[0].title || "empty" }}</td>
              <td>
                {{
                new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
                }).format(parseFloat(item.items[0].rate) | 0)
                }}
              </td>

              <td>
                {{
                new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
                }).format(parseFloat(item.items[0].amount))
                }}
              </td>
              <td>
                <a href>
                  invoice-
                  {{ `${item.invoice_no} ${item.debitor.name}` }}
                </a>
              </td>
              <td>
                <a v-bind:href="'/offers/' + item.debitor.id">
                  Offer-
                  {{  
                  `${item.items[0].offer_id} ${item.debitor.name}`
                  }}
                </a>
              </td>
              <td class="p-0 align-middle">
                <div class="btn-group" role="group" aria-label="First group">
                  <button type="button" class="btn btn-secondary btn-sm">
                   <i class="fa fa-eye-slash"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary btn-sm"
                    @click="updateItems(item.items[0].id)"
                  >
                   <i class="fa fa-edit"></i>
                  </button>
                  <button
                  btn-sm
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="DeleteItem(item.items[0].id, item.id)"
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
    </CCard>
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
    itemsData: "",
    debitor_invoice_id: "",
  }),
  mounted() {
    this.getDebitorInvoices();
  },
  filters: {
    dtSubtract(dt, duration, unit) {
      return moment.utc(dt).subtract(duration, unit);
    },
    dtFormat(dt, format) {
      return moment.utc(dt).format(format);
    },
  },
  computed: {
    hasPagination() {
      return this.totalPages > 1;
    },
    ...mapGetters(["getActiveTab"]),
  },
  methods: {
    CreateNew() {
      this.$router.push("/overview/open-items-create");
    },
    DeleteItem(id, de_id, params) {
      this.axios.delete("/items/" + id, { params }).then((res) => {});

      this.axios.delete("/debitor-invoices/" + de_id).then((res) => {
        if (res.status == 200) {
          this.getDebitorInvoices();
        }
      });
    },
    updateItems(id) {
      this.$router.push("/overview/open-items/" + id);
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
      this.getDebitorInvoices({ page: activePage });
    },

    getDebitorInvoices(params) {
      this.isLoading = true;
      this.axios
        .get("/debitor-invoices", {
          params,
        })
        .then((res) => {
          if (res.status == 200) {
            this.isLoading = false;
            this.datas = res.data.data;
            console.log(this.datas[0].id);
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
    },
    stringSort(value) {
      if (this.isSrtingSortClick) {
        this.datas = this.datas.sort((a, b) => (a[value] < b[value] ? -1 : 1));
        this.isSrtingSortClick = !this.isSrtingSortClick;
      } else {
        this.datas = this.datas.sort((a, b) => (a[value] > b[value] ? -1 : 1));
        this.isSrtingSortClick = !this.isSrtingSortClick;
      }
    },
  },
};
</script>

<style scoped>
.card-border-top {
  border-top: 3px solid #3c8dbc;
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
