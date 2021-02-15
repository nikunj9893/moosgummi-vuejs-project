<template>
  <div>
    <CAlert v-show="message" :class="className" class="text-white">
      <li v-for="(value, key) in message" :key="key">@{{ value }}</li>
    </CAlert>

    <h3>Add New Parcel</h3>
    <CCard class="card-border-top">
      <CCol lg-12>
        <label class="font-weight-bold">Debitor:</label>
        <autocomplete
          class="mb-2 custome-height"
          :source="customeName"
          results-property="items"
          v-model="parcelsData.debitor_id"
        ></autocomplete>
      </CCol>
      <CCol lg-12>
        <label class="font-weight-bold">Width (cm)</label>
        <CInput type="number" v-model="parcelsData.width" />
      </CCol>
      <CCol lg-12>
        <label class="font-weight-bold">Height (cm)</label>
        <CInput type="number" v-model="parcelsData.height" />
      </CCol>
      <CCol lg-12>
        <label class="font-weight-bold">Length (cm)</label>
        <CInput type="number" v-model="parcelsData.length" />
      </CCol>
      <CCol lg-12>
        <label class="font-weight-bold">Weight (kg)</label>
        <CInput type="number" v-model="parcelsData.weight" />
      </CCol>
      <CRow lg-12>
        <CCol>
          <CButton class="m-3" color="primary" @click="addParcelsData">Save</CButton>
        </CCol>
      </CRow>
    </CCard>
  </div>
</template>

<script>
import Autocomplete from "vuejs-auto-complete";
export default {
  data() {
    return {
      formData: {
        debitor_id: "",
        offer_date: "2021-02-02",
        description: "string",
      },
      customeName: [],
      message: "",
      messageForAddress: "",
      className: "bg-success",
      classNameForAddress: "bg-success",
      myModal: false,
      parcelsData: {
        debitor_id: "",
        width: 0,
        height: 0,
        weight: 0,
        length: 0,
        shipment_id: "",
        tracking_no: "",
        tracking_url: "",
        label_url: "",
        shipment_price: "",
      },
    };
  },
  methods: {
    addParcelsData() {
      this.axios
        .post("/parcels", this.parcelsData)
        .then((res) => {
          if (res.status == 200) {
            this.className = "bg-success";
            this.message = "New Adddres add successfully.";
          }
        })
        .catch((error) => {
          if (error.response.status == 422) {
            this.className = "bg-danger";
            this.message = error.response.data.errors;
          } else if (error.response.status == 500) {
            this.className = "bg-danger";
            this.message = error.response.data.errors;
          } else {
            this.className = "bg-danger";
            this.message = error.response.data.error;
          }
        });
    },
  },
  components: {
    Autocomplete,
  },
  mounted() {
    this.axios.get("/debitors").then((res) => {
      if (res.status == 200) {
        const contacts = res.data.data;
        contacts.filter((contact) => {
          this.customeName.push({
            id: contact.id,
            name: contact.handle + " - " + contact.name,
          });
        });
      }
    });
  },
};
</script>

<style>
.card-border-top {
  border-top: 3px solid #3c8dbc;
}
.autocomplete__box {
  height: 35px;
}
.btn-size {
  height: 35px;
}
.modalForm {
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 3px rgb(0 0 0 / 13%);
  box-shadow: 0 2px 3px rgb(0 0 0 / 13%);
  width: 100%;
  max-width: 600px;
  margin: auto;
  transform: translate(-35%, -60%);
  padding: 20px 20px;
  z-index: 999;
}
.modalForm form {
  width: 100%;
}
.input-group-addon {
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
  color: #555;
  text-align: center;
  background-color: #eee;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.modal-inerr {
  background-color: #000;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: block;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
  outline: 0;
  z-index: 99;
}
</style>