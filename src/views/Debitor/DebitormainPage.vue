<template>
  <div>
    <h5 class="font-weight-bold">Debitor</h5>
    <CCard class="p-2 card-border-top">
      <CTabs variant="tabs" :active-tab="ActiveTab">
        <CTab :title="tabName">
          <createNewInvoiceItem/>
        </CTab>
        <CTab title="Recurring">
          <createNewRecurring />
        </CTab>
        <CTab title="Current Bill"></CTab>
        <CTab title="Contact Person">
          <getDebitorcontacts />
        </CTab>
        <CTab title="Running Product"></CTab>
        <CTab title="Bill">
          <invoiceItemListing />
        </CTab>
        <CTab title="Offers">
          <view_debitor_offer/>
        </CTab>
        <CTab title="LDAP User"></CTab>
        <CTab title="Letter"></CTab>
        <CTab title="Check List"></CTab>
        <CTab title="Tickets"></CTab>
        <CTab title="Wallet"></CTab>

        <CTab title="Projects">
          <projectlayout/>
        </CTab>
      </CTabs>
    </CCard>
  </div>
</template>


<script>
import createNewInvoiceItem from "../itemManagement/createNewInvoiceItem";
import createNewRecurring from "../ManageRecurrings/createNewRecurring";
import getDebitorcontacts from "../contacts/getDebitorcontacts";
import invoiceItemListing from "../itemManagement/invoiceItemListing";
import view_debitor_offer from "../itemManagement/view_debitor_offer";
import projectlayout from "../manageProject/projectlayout";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    createNewInvoiceItem,
    createNewRecurring,
    getDebitorcontacts,
    invoiceItemListing,
    projectlayout,
    view_debitor_offer
  },
  computed: {
    ...mapGetters(["getinvoiceData"]),
  },
  data() {
    return {
      ActiveTab: "",
      tabName: "",
    };
  },
  methods: {
    ...mapActions(["setInvoiceData"]),
  },
  mounted() {
    this.setInvoiceData(this.$route.params);
    this.ActiveTab = parseInt(this.getinvoiceData.tab)
    this.tabName = this.getinvoiceData.name
  },
};
</script>


<style  scoped>
.card-border-top {
  border-top: 3px solid #3c8dbc;
}
</style>
