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
    <!-- <CButton class="bg-secondary mt-2 mb-4">Excel</CButton> -->

    <div class="tableResponsive">
      <table class="table">
        <!-- <loading :active.sync="isLoading"></loading> -->
        <vue-element-loading :active="isLoading" spinner="bar-fade-scale" color="#3c8dbc" />
        <thead>
          <tr class="card-border-top">
            <th scope="col">Status</th>
            <th scope="col" @click="floatSort('invoice_no')">
              Rechnung
              <i class="cil-arrow-bottom" v-show="isfloatSortClick == false"></i>
              <i class="cil-arrow-top" v-show="isfloatSortClick == true"></i>
            </th>
            <th scope="col" @click="floatSort('netto_sum')">
              Netto
              <i class="cil-arrow-bottom" v-show="isfloatSortClick == false"></i>
              <i class="cil-arrow-top" v-show="isfloatSortClick == true"></i>
            </th>
            <th scope="col" @click="floatSort('brutto_sum')">
              Brutto
              <i class="cil-arrow-bottom" v-show="isfloatSortClick == false"></i>
              <i class="cil-arrow-top" v-show="isfloatSortClick == true"></i>
            </th>
            <th scope="col" @click="floatSort('partPayment')">
              Teilzahlung
              <i class="cil-arrow-bottom" v-show="isfloatSortClick == false"></i>
              <i class="cil-arrow-top" v-show="isfloatSortClick == true"></i>
            </th>
            <th scope="col" @click="stringSort('forward_datetime')">
              Verschickt seit
              <i class="cil-arrow-bottom" v-show="isSrtingSortClick == false"></i>
              <i class="cil-arrow-top" v-show="isSrtingSortClick == true"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in datas" :key="item.id">
            <td class="p-0">
              <CButton size="lg">
                <i class="cil-file text-primary"></i>
              </CButton>
            </td>

            <td class="pointer text-primary" @click="addInvoiceItem(item.id)">
              <a>Rechnung-{{ item.invoice_no }}</a>
            </td>
            <td>
              {{
              new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
              }).format(parseFloat(item.netto_sum))
              }}
            </td>
            <td>
              {{
              new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
              }).format(parseFloat(item.brutto_sum))
              }}
            </td>

            <td>
              {{
              new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
              }).format(parseFloat(item.partPayment || 0))
              }}
            </td>
            <td>
              Shipped since
              {{ getDaysFromSpecificDate(item.forward_datetime) }}
              days
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
    debitor_id: "",
  }),
  mounted() {
    this.debitor_id = this.$route.params.debitor_invoice_id;
    this.getDebitorInvoices();
  },

  computed: {
    hasPagination() {
      return this.totalPages > 1;
    },
    ...mapGetters(["getActiveTab"]),
  },
  methods: {
    addInvoiceItem(debitor_id) {
      this.$router.push({
        path: "/debitor-invoices/"+debitor_id,
        name:'createDebitorInvoices',
        params: {
          debitor_id: debitor_id,
        },
      });
    },
    ...mapActions(["SetActiveTab"]),
    setActibeTabData() {
      this.SetActiveTab(this.activeTab);
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
        .get("/debitors/" + this.debitor_id + "/invoices", {
          params,
        })
        .then((res) => {
          if (res.status == 200) {
            this.isLoading = false;
            this.datas = res.data.data;
           
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
.pointer {
  cursor: pointer;
}
</style>
