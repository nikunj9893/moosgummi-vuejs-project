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
          results-property="items"
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

    <CButton class="btn-secondary mr-2" @click="addNewProject">Add</CButton>
    <CButton class="btn-secondary">Cancel</CButton>
  </div>
</template>

<script>
import Autocomplete from "vuejs-auto-complete";
import TheSidebarVue from "../../containers/TheSidebar.vue";
export default {
  data() {
    return {
      debitor_id: "",
      customeName: [],
      projectData: {
        name: "string",
        debitor_id: 0,
        position: 0,
        accounting: true,
        is_open: true,
      },
      message: "",
      className: "bg-success",
    };
  },
  components: {
    Autocomplete,
  },
  methods: {
    addNewProject() {
      this.axios
        .post("/projects", this.projectData)
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
    this.debitor_id = this.$route.params.debitor_id;
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
      console.log(this.customeName);
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