<template>
  <div>
    <CAlert v-if="message" color="mt-3 text-white" :class="className">{{message}}</CAlert>
    <div class="align-items mt-2 pb-1">
      <select
        class="btn dropdown-toggle btn-secondary m-2"
        v-on:change="onTextTypeChange($event)"
        v-model="textType"
      >
        <option role="menuitem" class="dropdown-item bg-white" disabled hidden>Select Text Type</option>
        <option role="menuitem" class="dropdown-item bg-white" value="Start Text">Start Text</option>
        <option role="menuitem" class="dropdown-item bg-white" value="End Text">End Text</option>
        <option role="menuitem" class="dropdown-item bg-white" value="Accept Text:">Accept Text:</option>
        <option
          role="menuitem"
          class="dropdown-item bg-white"
          value="Project Roadmap:"
        >Project Roadmap:</option>
      </select>
      <select
        class="btn dropdown-toggle btn-secondary m-2"
        v-on:change="onChange($event)"
        v-model="titleId"
      >
        <option role="menuitem" class="dropdown-item bg-white" disabled hidden>Select Title</option>
        <option
          v-for="texttype in dropTexttype"
          :key="texttype.id"
          role="menuitem"
          class="dropdown-item bg-white"
          :value="texttype.id"
        >{{texttype.title}}</option>
      </select>
      <CButton color="secondary ">Edit</CButton>
    </div>
    <CCard>
      <vue-element-loading :active="isLoading" spinner="bar-fade-scale" color="#3c8dbc" />
      <CRow class>
        <CCol lg-12>
          <!-- <loading :active.sync="isLoading"></loading> -->
          <label for class="mt-2 font-weight-bold ml-3">{{formdata.title}}</label>
          <vue-editor v-model="formdata.content"></vue-editor>
        </CCol>
      </CRow>

      <div class="align-items">
        <CButton color="success mr-3 ml-2 " @click="updateOffer">Update</CButton>
        <CInput type="text" class="mt-3 mr-3" placeholder="Title" v-model="formdata.title" />
        <CButton color="primary mr-3" @click="addTemplate">Add Template</CButton>
      </div>
    </CCard>
  </div>
</template>

<script>
import Dropdowns from "../buttons/Dropdowns.vue";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
import { VueEditor } from "vue2-editor";
import { flagSet } from "@coreui/icons";
export default {
  components: { Dropdowns, VueEditor, Loading },
  data() {
    return {
      className: "",
      message: "",
      textType: "Select Text Type",
      titleName: "Select Title",
      editorHeading: "",
      leftTitle: "Select Title",
      dropTexttype: "",
      titleId: "Select Title",
      isLoading: false,
      offerid: "",
      formdata: {
        title: "",
        content: "",
        title: "",
        default: "",
        debitor_id: "",
      },
    };
  },
  methods: {
    addTemplate() {
      this.axios
        .post("/offer-text-templates", this.formdata)
        .then((res) => {
          if (res.status == 200) {
            this.message = "New Template has been added";
            this.className = "bg-success";
          }
        })
        .catch((error) => {
          this.message = error;
          this.className = "bg-danger";
        });
    },
    updateOffer() {
      alert(this.titleId);
      this.axios
        .put("/offers/" + this.offerid, this.formdata)
        .then((res) => {
          if (res.status == 200) {
            this.message = "Offer has been update";
            this.className = "bg-success";
          }
        })
        .catch((error) => {
          if (error.Response.status == 400) {
            this.message = error;
            this.className = "bg-danger";
          }
        });
    },
    onTextTypeChange(event) {
      this.formdata.title = event.target.value;
    },
    onChange(event) {
      this.isLoading = true;
      this.editorHeading = event.target.value;
      this.axios.get("/offer-text-templates/" + this.titleId).then((res) => {
        if (res.status == 200) {
          this.formdata.content = res.data.data.content;
          this.isLoading = false;
        }
      });
    },
  },
  mounted() {
    this.formdata.debitor_id = this.$route.params.debitor_id;
    this.offerid = this.$route.params.offer_id;
    this.axios.get("/offer-text-templates").then((res) => {
      if (res.status == 200) {
        this.dropTexttype = res.data.data;
        console.log(this.dropTexttype);
      }
    });
  },
};
</script>

<style>
.align-items {
  display: flex;
  align-items: center;
}
</style>
