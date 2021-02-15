<template>
  <CTabs :active-tab=activeTab>
    <CTab title="Action"></CTab>
    <CTab title="Text">
     <offerTextTemplate/>
    </CTab>
    <CTab title="Template">Text will not be shown.</CTab>
    <CTab title="Item" class>
      <createNewOfferItem />
    </CTab>
    <CTab title="Rucurring"><createNewRecurringOffer/></CTab>
  </CTabs>
</template>

<script>
import createNewOfferItem from "./createNewOfferItem";
import offerTextTemplate from "./offerTextTemplate";
import createNewRecurringOffer from "./createNewRecurringOffer";
export default {
  data(){
    return{
      activeTab:''
    }
  },
  components: {
    createNewOfferItem,
    offerTextTemplate,
    createNewRecurringOffer
  },
  mounted()
  {
    this.activeTab = parseInt(this.$route.params.tab);
  }
 
};
</script>

<style>
</style>