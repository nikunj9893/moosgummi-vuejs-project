<template>
  <div>
    <div v-show="message">
      <CAlert v-show="message" class="bg-success">{{message}}</CAlert>
    </div>
    <div>
      <CCard class="mt-4">
        <CCardHeader color="secondary">control</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol lg-12>
              <table class="table">
                <tbody>
                  <tr>
                    <th>shipping</th>
                    <td>
                      <CButton class="btn btn-success mr-1 btn-sm">
                       <i class="fa fa-paper-plane"></i> Send
                      </CButton>
                      <CButton class="btn btn-primary mr-1 btn-sm">
                        <i class="fas fa-download"></i> Download
                      </CButton>
                      <CButton class="btn btn-primary btn-sm">
                        <i class="cil-mark"></i> mark sent
                      </CButton>
                    </td>
                    <td>Not Sent</td>
                  </tr>
                  <!-- <tr>
                <th>Transfer</th>
                <td>
                  <div v-if="debitorInvoice.direct_debit">
                    <CButton class="btn btn-secondary mr-1 mb-1 btn-sm" @click="DeActiveSepa">
                      <i class="cil-file"></i> Active-Sepa
                    </CButton>
                  </div>


                  <CButton v-else class="btn btn-secondary mr-1 mb-1 btn-sm" @click="ActiveSepa">
                    <i class="cil-file"></i> Active-Sepa
                  </CButton>
                  <CButton class="btn btn-success mr-1 mb-1 btn-sm">
                    <i class="cil-send"></i> Download SEPA-xml
                  </CButton>
                  <CButton class="btn btn-primary mr-1 mb-1 btn-sm">
                    <i class="cil-download"></i> SEPA-xml
                  </CButton>
                  <CButton class="btn btn-primary mr-1 mb-1 btn-sm">
                    <i class="cil-mark"></i> SEPA Submit
                  </CButton>
                </td>
                <td>Make transaction</td>
                  </tr>-->

                  <tr>
                    <th>Transfer</th>
                    <td>
                      <div v-show="debitorInvoice.direct_debit">
                        <CButton class="btn btn-success mr-1 mb-1 btn-sm">
                          <i class="cil-send"></i> SEPA-xml
                        </CButton>

                        <CButton
                          v-if="debitorInvoice.sepa_submit"
                          class="btn btn-success mr-1 mb-1 btn-sm"
                        >
                         <i class="fa fa-university"></i>  SEPA not submitted
                        </CButton>
                        <CButton v-else class="btn btn-success mr-1 mb-1 btn-sm">
                          <i class="fa fa-university"></i> SEPA submitted
                        </CButton>
                        <CButton class="btn btn-danger mr-1 mb-1 btn-sm" @click="DeActiveSepa">
                          <i class="cil-file"></i> DeActive-Sepa
                        </CButton>
                      </div>
                      <CButton class="btn btn-primary mr-1 mb-1 btn-sm" @click="ActiveSepa">
                          <i class="fas fa-download"></i> Active-Sepa
                      </CButton>

                      <CButton
                        v-if="debitorInvoice.forwarded"
                        class="btn btn-secondary mr-1 mb-1 btn-sm"
                      >
                        <i class="cil-file"></i> mark paid
                      </CButton>
                      <CButton
                        v-if="debitorInvoice.forwarded && !debitorInvoice.cash"
                        class="btn btn-secondary mr-1 mb-1 btn-sm"
                      >
                        <i class="cil-file"></i> mark paid
                      </CButton>

                      <CButton
                        v-if="debitorInvoice.forwarded && debitorInvoice.cash"
                        class="btn btn-warning mr-1 mb-1 btn-sm text-white"
                      >
                        <i class="cil-file"></i> mark unpaid
                      </CButton>
                    </td>
                    <td>Make transaction</td>
                  </tr>
                  <tr>
                    <th>miscellaneous</th>
                    <td>
                      <CButton
                        class="btn btn-success mr-1 mb-1 btn-sm"
                        v-if="debitorInvoice.storno"
                      >
                        <i class="cil-send"></i> uncancel
                      </CButton>
                      <CButton
                        class="btn btn-danger mr-1 mb-1 btn-sm"
                        v-else
                        @click="StornoToggole"
                      >
                        <i class="cil-download"></i> Strono
                      </CButton>

                      <div v-show="debitorInvoice.storno">
                        <CButton
                          class="btn btn-danger mr-1 mb-1 btn-sm"
                          v-if="debitorInvoice.forwarded"
                        >
                          <i class="cil-download"></i> Send Strono
                        </CButton>

                        <CButton class="btn btn-warning text-white mr-1 mb-1 btn-sm" v-else>
                          <i class="cil-mark"></i> download Cancellation
                        </CButton>

                        <CButton class="btn btn-warning text-white mr-1 mb-1 btn-sm">
                          <i class="cil-mark"></i> download Storno
                        </CButton>
                      </div>
                    </td>
                    <td v-if="debitorInvoice.storno">Invoice has been canceled</td>
                  </tr>
                </tbody>
              </table>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    debitor_id: "",
    debitor_invoice_id: "",
    debitorInvoice: "",
    day: "",
    forwarded: "",
    stronoMessage: "",
    directDebitMessage: "",
    storno: "",
    message: "",
  }),
  methods: {
    ActiveSepa() {
      this.debitorInvoice.direct_debit = 1;
      this.directDebitMessage = "Invoice direct debit on!";
      this.message = "Invoice direct debit on!";
      this.axios
        .put("/debitor-invoices/" + this.debitor_invoice_id, {
          direct_debit: this.debitorInvoice.direct_debit,
        })
        .then((res) => {
          if (res.status == 200) {
            // alert(this.directDebitMessage);
          }
        });
    },
    DeActiveSepa() {
      this.debitorInvoice.direct_debit = 0;
      this.directDebitMessage = "Invoice direct debit off!";
      this.message = "Invoice direct debit off!";

      this.axios
        .put("/debitor-invoices/" + this.debitor_invoice_id, {
          direct_debit: this.debitorInvoice.direct_debit,
        })
        .then((res) => {
          if (res.status == 200) {
            // alert(this.directDebitMessage);
          }
        });
    },
    StornoToggole() {
      console.log(this.debitorInvoice);
      if (!this.debitorInvoice.storno) {
        this.debitorInvoice.storno = 1;
        this.stronoMessage = "Invoice marked as cancelled!";
        this.message = "Invoice marked as cancelled!";
      } else {
        this.debitorInvoice.storno = 0;
        this.stronoMessage = "Invoice marked as not cancelled!";
        this.message = "Invoice marked as not cancelled!";
      }
      this.axios
        .put("/debitor-invoices/" + this.debitor_invoice_id, {
          storno: this.debitorInvoice.storno,
        })
        .then((res) => {
          if (res.status == 200) {
            // alert(this.stronoMessage);
          }
        });
    },
    getDayFromSpecificDate(date) {
      var date1 = new Date(date);
      var date2 = new Date();
      var difference = date2.getTime() - date1.getTime();
      var days = Math.ceil(difference / (1000 * 3600 * 24));
      this.day = days;
    },
  },
  mounted() {
    this.debitor_id = this.$route.params.debitor_id;
    this.axios.get("/debitor-invoices/" + this.debitor_id).then((res) => {
      this.debitorInvoice = res.data.data;
      this.debitor_invoice_id = res.data.data.debitor.id;
      this.forwarded = res.data.data.forwarded;
      this.storno = this.debitorInvoice.storno;
      this.getDayFromSpecificDate(this.debitorInvoice.forward_datetime);
    });
  },
};
</script>

<style>
</style>

