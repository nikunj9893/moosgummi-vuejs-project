<template>
  <div>
    <h5 text-dark>Rechnung</h5>
    <CCard class="card-border-top">
      <CCol>
        <CTabs variant="tabs" class="mt-2" :active-tab="page">
          <CTab title="waiting for payment">
            <waitingForPayment />
          </CTab>
          <CTab title="SEPA invoices">
            <SEPAInvoices />
          </CTab>
          <CTab title="Payment remaind set">
            <PaymentRemaindSet />
          </CTab>
          <CTab title="Ready for dispatch">
            <ReadyForDispatch />
          </CTab>
          <CTab title="overview.dunning1">
            <OverViewDunnung1 />
          </CTab>
          <CTab title="overview.dunning2">
            <OverViewDunnung2 />
          </CTab>
          <CTab title="overview.customer-care">
            <OverviewCustomerCare />
          </CTab>
        </CTabs>
      </CCol>
    </CCard>
  </div>
</template>
<script>
import CTableWrapper from "@/views/base/Table.vue";
import waitingForPayment from "./Dashbord/waitingForPayment";
import PaymentRemaindSet from "./Dashbord/PaymentRemaindSet";
import ReadyForDispatch from "./Dashbord/ReadyForDispatch";
import OverViewDunnung1 from "./Dashbord/OverViewDunnung1";
import OverViewDunnung2 from "./Dashbord/OverViewDunnung2";
import OverviewCustomerCare from "./Dashbord/OverviewCustomerCare";
import SEPAInvoices from "./Dashbord/SEPAInvoices";
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  data: () => ({
    page: 1,
  }),
  components: {
    CTableWrapper,
    waitingForPayment,
    SEPAInvoices,
    PaymentRemaindSet,
    ReadyForDispatch,
    OverViewDunnung1,
    OverViewDunnung2,
    OverviewCustomerCare,
  },
  mounted() {
    this.page = parseInt(
      window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ]
    );
  },
};
</script>

<style scoped>
.card-border-top {
  border-top: 3px solid #3c8dbc;
}
</style>
