<template>
  <div>
    <CTabs variant="tabs" class="mt-2" :active-tab="3">
      <CTab title="Action"></CTab>
      <CTab title="Texs"></CTab>
      <CTab title="Templates"></CTab>
      <CTab title="Items">
        <createNewInvoiceItem />
      </CTab>
      <CTab title="Recurring">
        <createNewRecurring />
      </CTab>
    </CTabs>
  </div>
</template>

<script>
import createNewInvoiceItem from "./createNewInvoiceItem";
import createNewRecurring from "../ManageRecurrings/createNewRecurring";
export default {
  components: {
    createNewInvoiceItem,
    createNewRecurring,
  },
};
</script>

<style></style>
