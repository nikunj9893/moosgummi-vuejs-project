<template>
  <div>
    <CRow>
      <CCol lg-6>
        <currentBillControl />
      </CCol>
      <CCol lg-6>
        <currentBillWaranning />
      </CCol>
    </CRow>
    <CRow>
      <CCol lg-12>
        <createDebitorInvoices />
      </CCol>
    </CRow>
  </div>
</template>
<script>
import currentBillControl from "./currentBillControl";
import currentBillWaranning from "./currentBillWaranning";
import createDebitorInvoices from "./createDebitorInvoices";
export default {
  components: {
    currentBillControl,
    currentBillWaranning,
    createDebitorInvoices,
  },
};
</script>

<style>
</style>