<template>
  <div>
    <CAlert class="text-white" :class="className" v-show="message">
      <li v-for="mess in message" :key="mess.name">{{mess}}</li>
    </CAlert>
    <h1 class>New timeslot</h1>
    <CCard class="card-border-top">
      <CCol lg-12 class="mt-3">
        <label class="font-weight-bold">Date:</label>
        <CInput type="date" v-model="timeslotData.date" />
      </CCol>
      <CCol lg-12>
        <label class="font-weight-bold">Debitor Id:</label>
        <div class="d-flex">
          <autocomplete
            v-on:input="onChange"
            v-model="pro_id"
            class="mb-2 custome-height"
            :source="customeName"
            results-property="items"
          ></autocomplete>
        </div>
      </CCol>
      <CCol lg-12>
        <label class="font-weight-bold">Project:</label>
        <autocomplete
          v-model="timeslotData.project_id"
          class="mb-2 custome-height"
          :source="projectName"
          results-property="items"
        ></autocomplete>
      </CCol>
      <CCol lg-12>
        <label class="font-weight-bold">Description:</label>
        <CInput type="text" v-model="timeslotData.description" />
      </CCol>
      <CCol lg-12>
        <label class="font-weight-bold">Duration:</label>
        <CInput type="text" v-model="timeslotData.duration" />
      </CCol>
      <CRow lg-12>
        <CCol>
          <CButton class="m-2" color="primary" @click="createTimeslotdata">Save</CButton>
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
      customeName: [],
      projectName: [],
      className: "bg-success",
      message: "",
      pro_id: "",
      timeslotData: {
        project_id: 0,
        date: "2021-02-08",
        duration: 0,
        description: "string",
        accounting: true,
        lock: true,
        invoice: true,
        transferred: true,
      },
    };
  },
  methods: {
    onChange() {
      this.axios.get("/projects?debitor_id=" + this.pro_id).then((res) => {
        if (res.status == 200) {
          // console.log(res.data.data[0].name);
          this.projectName = [];
          //   this.projectName.push({
          //     id: 0,
          //     name: "general",
          //   });
          for (let i = 0; i < res.data.data.length; i++) {
            //   alert("is= "+res.data.data.id,)
            this.projectName.push({
              id: res.data.data[i].id,
              name: res.data.data[i].name,
            });
          }
        }
      });
    },
    createTimeslotdata() {
      // alert(this.timeslotData.project_id)
      this.axios
        .post("/timeslots", this.timeslotData)
        .then((res) => {
          if (res.status == 200) {
            this.className = "bg-success";
            this.message = "timeslot added";
          }
        })
        .catch((error) => {
          if (error.response.status == 422) {
            this.className = "bg-danger";
            this.message = error.response.data.errors;
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