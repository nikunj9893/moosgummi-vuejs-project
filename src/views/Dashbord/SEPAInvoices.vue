<template>
   <div>
      <CAlert class="text-white my-3" :class="className" v-show="message">
         {{ message }}
      </CAlert>
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
                  <th scope="col">Check</th>
                  <th scope="col">Status</th>
                  <th scope="col">Tools</th>
                  <th scope="col" @click="floatSort('invoice_no')">
                     Rechnung
                     <!-- <i v-show="isfloatSortClick" class="cil-arrow-bottom"></i>
              <i v-show="!isfloatSortClick" class="cil-arrow-bottom"></i>-->
                  </th>
                  <th scope="col" @click="stringSort('contact_name')">Kunde</th>
                  <th scope="col" @click="floatSort('netto_sum')">
                     Betrag Ohne Mw St
                  </th>
                  <th scope="col" @click="floatSort('brutto_sum')">
                     Betrag Inkl Steuer
                  </th>
                  <th scope="col" @click="stringSort('forward_datetime')">
                     Verschickt seit
                  </th>
               </tr>
            </thead>
            <tbody>
               <tr v-for="item in datas" :key="item.id">
                  <td class="p-0">
                     <CButton size="lg btn-sm">
                        <div class="form-check">
                           <input
                              type="checkbox"
                              :value="item.id"
                              v-model="selected"
                           />
                        </div>
                     </CButton>
                  </td>

                  <td class="p-0">
                     <CButton size="lg btn-sm">
                        <span class="fa-stack">
                           <i class="far fa-file fa-stack-2x"></i>
                           <i class="fa fa-sync fa-stack-1x"></i>
                        </span>
                     </CButton>
                  </td>

                  <td class="p-0 align-middle">
                     <div
                        class="btn-group"
                        role="group"
                        aria-label="First group"
                     >
                        <button
                           type="button"
                           class="btn btn-primary btn-sm"
                           @click="downloadSepaFile(item.sepa_xml_file_id)"
                        >
                           <i class="fas fa-money-bill"></i>
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
                        }).format(parseFloat(item.brutto_sum))
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
      <CButton class="btn-primary mb-3" @click="genearteSEPAXMl">
         Genearte SEPA-Xml
      </CButton>
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
      selected: [],
      datas: "",
      page: 1,
      totalItems: 0,
      totalPages: 0,
      isfloatSortClick: true,
      isSrtingSortClick: true,
      isActive: true,
      idForGenerateSEPAInvoice: [],
      message: "",
      className: "",
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
      async genearteSEPAXMl() {
         for (let i = 0; i < this.selected.length; i++) {
            console.log(this.selected[i]);
            await this.axios("/debitor-invoices/ " + this.selected[i] + "/sepa")
               .then((res) => {
                  if (res.status == 200) {
                  }
               })
               .catch((error) => {
                  this.message =
                     "ERROR FOR: invoice ID = " +
                     this.selected[i] +
                     error.response.data.error;
                  this.className = "bg-danger";
               });
         }
      },
      select() {
         this.selected = [];
         if (!this.selectAll) {
            for (let i in this.items) {
               this.selected.push(this.items[i].id);
            }
         }
      },
      downloadSepaFile(id) {
         if (id == null) {
            this.message = "Cannot find the SEPA-XML invoice id";
            this.className = "bg-danger";
         }
         if (id != null) {
            this.axios
               .get("/sepa-xml-files/" + id + "/download")
               .then((res) => {
                  if (res.status == 200) {
                     let blob = new Blob([res.data.data], {
                        type: "application/pdf",
                     });
                     let link = document.createElement("a");
                     link.href = window.URL.createObjectURL(blob);
                     link.download = "test.pdf";
                     link.click();
                  }
               });
         }
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
            .get("/debitor-invoices?sepa_submit=0", {
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
.fa-stack {
   display: inline-block;
   height: 2em;
   line-height: 2em;
   position: relative;
   vertical-align: middle;
   width: 2.5em;
}
</style>
