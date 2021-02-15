<template>
  <div>
    <CButton class="bg-secondary mt-2 mb-4">Reset</CButton>

    <div class="tableResponsive">
      <table class="table">
        <!-- <loading :active.sync="isLoading"></loading> -->
        <vue-element-loading :active="isLoading" spinner="bar-fade-scale" color="#3c8dbc" />

        <thead>
          <tr class="card-border-top">
            <th scope="col">Status</th>
            <th scope="col">Tools</th>
            <th scope="col" @click="floatSort('invoice_no')">
              Rechnung
              <!-- <i v-show="isfloatSortClick" class="cil-arrow-bottom"></i>
              <i v-show="!isfloatSortClick" class="cil-arrow-bottom"></i>-->
            </th>
            <th scope="col" @click="stringSort('contact_name')">Kunde</th>
            <th scope="col" @click="floatSort('netto_sum')">Betrag Ohne Mw St"</th>
            <th scope="col" @click="floatSort('partPayment')">Teilzahlung</th>
            <th scope="col" @click="stringSort('forward_datetime')">Verschickt seit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in datas" :key="item.id">
            <td class="p-0">
              <CButton size="lg">
                <i class="cil-file text-primary"></i>
              </CButton>
            </td>

            <td class="p-0 align-middle">
              <div class="btn-group" role="group" aria-label="First group">
                <button type="button" class="btn btn-primary">
                  <i class="cil-data-transfer-down" color="white"></i>
                </button>
                <button type="button" class="btn btn-success">
                  <i class="cil-featured-playlist"></i>
                </button>
              </div>
            </td>
            <td>Rechnung-{{ item.invoice_no }}</td>
            <td>{{ item.contact_name }}</td>
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
import VueElementLoading from "vue-element-loading";

// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
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
  }),
  mounted() {
    this.getDebitorInvoices();
  },

  computed: {
    hasPagination() {
      return this.totalPages > 1;
    },
  },
  methods: {
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
        .get("/debitor-invoices?reminded=3", {
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
        this.datas = this.datas.sort((a, b) => (a[value] < b[value] ? -1 : 1));
        this.isSrtingSortClick = !this.isSrtingSortClick;
      } else {
        this.datas = this.datas.sort((a, b) => (a[value] > b[value] ? -1 : 1));
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
