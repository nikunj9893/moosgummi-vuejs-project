<template>
  <CCard class="mt-4">
    <CCardHeader color="secondary">Warring</CCardHeader>
    <CCardBody>
      <CRow>
        <CCol lg-12>
          <table class="table">
            <tbody>
              <tr>
                <td class="pt-3">Bill</td>
                <td class="pt-3" v-if="debitorInvoice.forwarded">sent {{day}} days</td>
                <td class="pt-3" v-else>Invoice has not yet been sent</td>
                <td class="align-middle">
                  <CButton class="btn btn-primary btn-sm" @click="SendInvoices">
                    <i class="fa fa-paper-plane"></i> Send Invoice
                  </CButton>
                </td>
              </tr>
              <tr>
                <td class="pt-3">Payment reminder</td>
                <td class="pt-3" v-if="parseInt(debitorInvoice.reminded)>=1">sent {{day}} days</td>
                <td class="pt-3" v-else>Payment reminder has not yet been sent</td>
                <td class="align-middle btn-sm">
                  <CButton
                    class="btn btn-success btn-sm"
                    v-bind:class="{ forwarded:false, 'disabled': '' }"
                  >
                    <i class="fa fa-paper-plane"></i> Send Reminder
                  </CButton>
                </td>
              </tr>
              <tr>
                <td class="pt-3">1st reminder</td>
                <td class="pt-3">1st reminder has not yet been sent</td>
                <td class="align-middle">
                  <CButton class="btn btn-warning text-white btn-sm">
                    <i class="fa fa-paper-plane"></i> Send Frist Dunning
                  </CButton>
                </td>
              </tr>
              <tr>
                <td class="pt-3">2nd reminder</td>
                <td class="pt-3">2. Reminder has not yet been sent</td>
                <td class="align-middle">
                  <CButton class="btn btn-danger btn-sm">
                    <i class="fa fa-paper-plane"></i> Send second Dunning
                  </CButton>
                </td>
              </tr>
            </tbody>
          </table>
        </CCol>
      </CRow>
    </CCardBody>
  </CCard>
</template>

<script>
export default {
  data: () => ({
    debitor_id: "",
    debitor_invoice_id: "",
    debitorInvoice: "",
    day: "",
    forwarded: "",
  }),
  methods: {
    getDayFromSpecificDate(date) {
      var date1 = new Date(date);
      var date2 = new Date();
      var difference = date2.getTime() - date1.getTime();
      var days = Math.ceil(difference / (1000 * 3600 * 24));
      this.day = days;
    },
    SendInvoices() {
      this.axios
        .get(
          "/debitor-invoices/" + this.debitor_invoice_id + "/send?action=send"
        )
        .then((res) => {
          if (res.status == 200) {
            alert("invoice sent successfully");
          }
        })
        .catch((error) => {
          alert("invoice not sent");
        });
    },
  },
  mounted() {
    this.debitor_id = this.$route.params.debitor_id;
    this.axios.get("/debitor-invoices/" + this.debitor_id).then((res) => {
      this.debitorInvoice = res.data.data;
      this.debitor_invoice_id = res.data.data.debitor.id;
      this.forwarded = res.data.data.forwarded;
      this.getDayFromSpecificDate(this.debitorInvoice.forward_datetime);
    });
  },
};
</script>


<style>
</style>