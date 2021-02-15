<template>
  <div>
    <CAlert v-show="message" class="text-white mb-2" :class="className">
      <li v-for="mess in message" :key="mess.id">{{mess}}</li>
    </CAlert>
    <h1 class="border-bt pb-3">new project</h1>
    <CRow>
      <CCol lg-12>
        <label class="font-weight-bold">Customers:</label>
        <autocomplete
          class="mb-2 custome-height"
          v-model="projectData.debitor_id"
          :source="customeName"
        ></autocomplete>
      </CCol>
    </CRow>

    <CRow>
      <CCol lg-12>
        <label class="font-weight-bold">Position:</label>
        <CInput v-model="projectData.position" />
      </CCol>
    </CRow>

    <CRow>
      <CCol lg-12>
        <label class="font-weight-bold">Surname:</label>
        <CInput v-model="projectData.name" />
      </CCol>
    </CRow>
    <CRow>
      <input type="checkbox" id="open" class="ml-3 form-check-input" v-model="projectData.is_open" />
      <label class="ml-5 font-weight-bold" for="open">Open</label>
    </CRow>

    <CButton class="btn-secondary mr-2" @click="projectUpdate">update</CButton>
    <CButton class="btn-secondary">Cancel</CButton>
  </div>
</template>

<script>
import Autocomplete from "vuejs-auto-complete";
import TheSidebarVue from "../../containers/TheSidebar.vue";
export default {
  data() {
    return {
      id: "",
      customeName: [],
      projectData: {
        name: "string",
        debitor_id: "test",
        position: 0,
        accounting: true,
        is_open: false,
      },
      message: "",
      className: "bg-success",
    };
  },
  components: {
    Autocomplete,
  },
  methods: {
    projectUpdate() {
      this.axios
        .put("/projects/" + this.id, this.projectData)
        .then((res) => {
          if (res.status == 200) {
            this.$router.push("/project");
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
  mounted() {
    this.id = parseInt(
      window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ]
    );
    this.axios.get("/debitors").then((res) => {
      if (res.status == 200) {
        const contacts = res.data.data;
        contacts.filter((contact) => {
          this.customeName.push({
            id: contact.id,
            name: contact.name,
          });
        });
      }
      this.axios.get("projects/" + this.id).then((res) => {
        if (res.status == 200) {
          this.projectData = res.data.data;
        }
      });
    });
  },
};
</script>

<style>
.border-bt {
  border-bottom: 1px solid black;
}
.autocomplete__box {
  height: 33px;
}
</style>