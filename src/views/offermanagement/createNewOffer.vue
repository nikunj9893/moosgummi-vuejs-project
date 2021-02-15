<template>
  <div>
    <CAlert v-show="message" :class="className" class="text-white">{{message}}</CAlert>
    <!-- <validation-errors :errors="message" v-if="message"></validation-errors> -->
    <li v-for="(value, key) in message" :key="key">@{{ value }}</li>
    <h5 class="font-weight-bold">Add new Offer</h5>
    <CCard class="card-border-top">
      <CCol lg-12 class="mt-3">
        <label class="font-weight-bold">Date:</label>
        <CInput type="date" v-model="formData.offer_date" />
      </CCol>
      <CCol lg-12>
        <label class="font-weight-bold">Debitor Id:</label>
        <div class="d-flex">
          <autocomplete
            class="mb-2 custome-height"
            :source="customeName"
            results-property="items"
            v-model="formData.debitor_id"
          ></autocomplete>
          <CButton color="success  btn-md btn-size ml-2" @click="toggle">
            <i class="cil-plus"></i>
          </CButton>
          <!-- ============================== MODEL START ==================================== -->
          <div v-show="myModal" class="modal-inerr">
            <div class="modalForm">
              <CAlert
                v-show="messageForAddress"
                :class="classNameForAddress"
                class="text-white"
              >{{messageForAddress}}</CAlert>
              <div class="modal-header">
                <h3 class="modal-title">add Debitor</h3>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  @click="CloseModal"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div class="divider"></div>
              <div class="modal-body">
                <CRow>
                  <div class="form-group">
                    <label class="col-sm-12">
                      <input checked="checked" name="business" type="radio" value="1" />
                      Geschäftskunde
                    </label>

                    <label class="col-sm-12">
                      <input name="business" type="radio" value="0" />
                      Privatkunde
                    </label>
                  </div>
                  <div class="col-sm-9">
                    <label class="font-weight-bold">Name</label>
                    <CInput v-model="addressData.street" />
                  </div>
                  <div class="col-sm-3">
                    <label class="font-weight-bold">handle</label>
                    <div class="input-group">
                      <input class="form-control" name="handle_start" type="text" id="handle_start" />
                      <span class="input-group-addon">1</span>
                    </div>
                  </div>
                  <div class="col-sm-8">
                    <label class="font-weight-bold">Road</label>
                    <CInput v-model="addressData.road" />
                  </div>
                  <div class="col-sm-4">
                    <label lass="font-weight-bold">House Number</label>
                    <div class="input-group">
                      <input
                        v-model="addressData.housenumber"
                        class="form-control"
                        name="handle_start"
                        type="text"
                        id="handle_start"
                      />
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <label class="font-weight-bold">Post Address :</label>
                    <CInput v-model="addressData.zipcode" />
                  </div>
                  <div class="col-sm-8">
                    <label class="font-weight-bold">City</label>
                    <div class="input-group">
                      <input
                        v-model="addressData.city"
                        class="form-control"
                        name="handle_start"
                        type="text"
                        id="handle_start"
                      />
                    </div>
                  </div>
                  <div class="col-sm-12">
                    <CButton class="btn btn-primary" @click="addNewAddress" value="Save">Save</CButton>
                  </div>
                  <div class="col-sm-12 mt-2">
                    <textarea id="raw-customer-data" class="form-control" rows="6"></textarea>
                  </div>
                </CRow>
              </div>
            </div>
          </div>

          <!-- ============================== MODEL END ==================================== -->
        </div>
      </CCol>
      <CCol lg-12>
        <label class="font-weight-bold">Description:</label>
        <CInput type="text" v-model="formData.description" />
      </CCol>
      <CRow lg-12>
        <CCol>
          <CButton class="m-2" color="primary" @click="addoffer">Save</CButton>
          <CButton class="m-2" color="secondary">Cancel</CButton>
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
      addressData: {
        street: "string",
        road: "",
        housenumber: 0,
        zipcode: "string",
        city: "string",
        active: true,
      },
    };
  },
  methods: {
    addNewAddress() {
      this.addressData.street = this.addressData.street + this.addressData.road;
      this.axios
        .post("/addresses", this.addressData)
        .then((res) => {
          if (res.status == 200) {
            this.className = "bg-success";
            this.message = "New Adddres add successfully.";
            this.myModal = false;
          }
        })
        .catch((error) => {
          if (error.response.status == 422) {
            this.classNameForAddress = "bg-danger";
            this.messageForAddress = error.response.data.errors;
          }
        });
    },
    CloseModal() {
      this.myModal = false;
    },
    toggle() {
      if (this.myModal == true) {
        document.getElementsByTagName("body")[0].removeAttribute("class", "");

        this.myModal = false;
      } else {
        document
          .getElementsByTagName("body")[0]
          .setAttribute("class", "modal-open");
        this.myModal = true;
      }
    },
    addoffer() {
      if (this.formData.debitor_id == "") {
        this.className = "bg-danger";
        this.message = "Please select the debitor_id";
      } else {
        this.axios.post("/offers", this.formData).then((res) => {
          if (res.status == 200) {
            this.className = "bg-success";
            this.message = "Offer saved successfully.";
            console.log(res.data.data);
          }
        });
      }
    },
  },
  components: {
    Autocomplete,
  },
  mounted() {
    this.axios.get("/contacts").then((res) => {
      if (res.status == 200) {
        const contacts = res.data.data;
        contacts.filter((contact) => {
          this.customeName.push({
            id: contact.debitor_id,
            name: contact.prename + contact.surname,
          });
        });
      }
      console.log(this.customeName);
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