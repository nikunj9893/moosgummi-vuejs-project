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
    <CAlert v-show="message" :class="className" class="text-white">{{message}}</CAlert>

    <div class="btn-align">
      <h4>Accepted Offer</h4>
      <CButton class="bg-primary text-white mt-3 ml-3 mb-4" @click="createNewOfferItems">
        <i class="cil-plus">Create</i>
      </CButton>
    </div>

    <div class="tableResponsive">
      <table class="table">
        <!-- <loading :active.sync="isLoading"></loading> -->
        <vue-element-loading :active="isLoading" spinner="bar-fade-scale" color="#3c8dbc" />
        <thead>
          <tr class="card-border-top">
            <th scope="col">#</th>
            <th scope="col">Debitor ID</th>
            <th scope="col" @click="floatSort('invoice_no')">
              Date
              <i class="cil-arrow-bottom" v-show="isfloatSortClick == false"></i>
              <i class="cil-arrow-top" v-show="isfloatSortClick == true"></i>
            </th>
            <th scope="col" @click="stringSort('contact_name')">
              Description
              <i class="cil-arrow-bottom" v-show="isSrtingSortClick == false"></i>
              <i class="cil-arrow-top" v-show="isSrtingSortClick == true"></i>
            </th>
            <th scope="col" @click="floatSort('netto_sum')">
              Creted By
              <i class="cil-arrow-bottom" v-show="isfloatSortClick == false"></i>
              <i class="cil-arrow-top" v-show="isfloatSortClick == true"></i>
            </th>
            <th scope="col" @click="floatSort('brutto_sum')">
              status
              <i class="cil-arrow-bottom" v-show="isfloatSortClick == false"></i>
              <i class="cil-arrow-top" v-show="isfloatSortClick == true"></i>
            </th>
            <th scope="col" @click="floatSort('partPayment')">
              Action
              <i class="cil-arrow-bottom" v-show="isfloatSortClick == false"></i>
              <i class="cil-arrow-top" v-show="isfloatSortClick == true"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in datas" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.debitor.id }} : {{ item.debitor.handle }} - {{ item.debitor.name }}</td>
            <td>{{ item.created_at | dtFormat('DD-MM-YY')}}</td>
            <td>{{item.description}}</td>

            <td v-if="item.created_by">{{item.created_by.name }}</td>
            <td v-else>-</td>

            <td>{{item.sent || '-'}}</td>

            <td class="p-0 align-middle">
              <div class="btn-group" role="group" aria-label="First group">
                <button type="button" class="btn btn-secondary btn-sm" @click="manageOffer(item.id)">
                  <i class="fa fa-search"></i>
                </button>
                <button type="button" class="btn btn-primary btn-sm" @click="downloadOffer(item.id)">
                  <i class="fas fa-download"></i>
                </button>
                <button type="button" class="btn btn-success btn-sm" @click="markOfferAsSent(item.id)">
                  <i class="fa fa-paper-plane"></i>
                </button>
                <button type="button" class="btn btn-success btn-sm" @click="markAsAccept(item.id)">
                  <i class="fa fa-check"></i>
                </button>
                <button type="button" class="btn btn-danger btn-sm" @click="markRejected(item.id)">
                  <i class="fa fa-times"></i>
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
    message: "",
    className: "bg-success",
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
    createNewOfferItems() {
      this.$router.push("/create/new-offer");
    },
    manageOffer(id) {
      this.$router.push({
        name: "offerManagetab",
        path: "/offer/" + id,
        url: "/offer/" + id,
        params: {
          tab: "3",
          offer_id: id,
        },
      });
    },
    downloadOffer(id) {},
    markOfferAsSent(id) {},
    markAsAccept(id) {
      this.axios
        .post("/offers/" + id + "/accept")
        .then((res) => {
          if (res.status == 200) {
            this.className = "bg-success";
            this.message = "mark offer as accepted";
          }
        })
        .catch((error) => {
          this.className = "bg-danger";
          if (error.response.status == 400) {
            this.message = error.response.data.error;
          }
        });
    },
    markRejected(id) {
      this.axios
        .post("/offers/" + id + "/reject")
        .then((res) => {
          if (res.status == 200) {
            this.className = "bg-success";
            this.message = "mark offer as rejected";
          }
        })
        .catch((error) => {
          this.className = "bg-danger";
          if (error.response.status == 400) {
            this.message = error.response.data.error;
          }
        });
    },

    downloadSepaXMl() {
      alert("call");
    },
    downloadInvoice(id) {
      this.axios.get("/debitor-invoices/" + id + "/download").then((res) => {
        if (res.status == 200) {
          let blob = new Blob([res.data.data], { type: "application/pdf" });
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "test.pdf";
          link.click();
        }
      });
    },

    debitor(name, id, debitor_id) {
      // this.$router.push("/debitors/1");
      this.$router.push({
        name: "debitors",
        path: "/debitors/" + debitor_id,
        params: {
          name: name,
          tab: "0",
          debitor_invoice_id: id,
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
        .get("/offers?accepted=1", {
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

.tableResponsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.pointerCursor {
  cursor: pointer;
}
.btn-align {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
