<template>
  <div>
    <h4>Split Item</h4>
    <CCard class="pl-2 card-border-top font-weight-bold">
      <CRow>
        <CCol lg-12 class="mx-2 mt-3">
          <label for="Divisor">Divisor:</label>
          <CInput type="number" id="Divisor" v-model="SplitItemValue"></CInput>
        </CCol>
      </CRow>
      <CRow>
        <CCol lg-12 class>
          <CButton class="btn-primary mx-2 mb-2" @click="SplitItem">Split Item</CButton>
        </CCol>
      </CRow>
    </CCard>
  </div>
</template>

<script>
import { parse } from "@babel/core";
export default {
  data() {
    return {
      itemId: "",
      SplitItemValue: 0,
      invoiceData: "",
    };
  },
  methods: {
    SplitItem() {
      //   alert(this.SplitItemValue);
      console.log("invoice data here = " + this.invoiceData.rate);
      const formdata = this.invoiceData;
      formdata.rate =
        parseFloat(this.invoiceData.rate) / parseInt(this.SplitItemValue);
      for (let i = 0; i < parseInt(this.SplitItemValue); i++) {
        console.log("invoice data there = " + this.invoiceData.rate);
        this.axios.post("/items", formdata).then((res) => {
          if (res.status == 200) {
            console.log("done");
          }
        });
      }
      this.axios.delete("/items/" + this.itemId).then((res) => {
        if (res.status == 200) {
          alert("Item Split");
        }
      });
    },
  },
  mounted() {
    this.itemId = parseInt(
      window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ]
    );
    // alert(this.itemId);
    this.axios.get("/items/" + this.itemId).then((res) => {
      if (res.status == 200) {
        this.invoiceData = res.data.data;
      }
    });
  },
};
</script>

<style>
.card-border-top {
  border-top: 3px solid #3c8dbc;
}
</style>