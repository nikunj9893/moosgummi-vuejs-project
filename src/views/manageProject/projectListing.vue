<template>
  <div>
    <CAlert class="text-white mt-3 mb-3" v-show="message" :class="className">{{message}}</CAlert>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Project</th>
          <th scope="col">Status</th>
          <th scope="col">
            <CButton class="btn-success" @click="createNewproject">
              <i class="fa fa-plus"></i>
            </CButton>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projectdata in projectdatas" :key="projectdata.id">
          <th scope="row">{{projectdata.id}}</th>
          <td>{{projectdata.name}}</td>
          <td>{{projectdata.is_open}}</td>
          <td>
            <CButton class="btn-secondary mr-1" @click="editProject(projectdata.id)">
              <i class="fa fa-edit"></i>
            </CButton>
            <CButton class="btn-danger" @click="deleteProject(projectdata.id)">
              <i class="fa fa-trash-o"></i>
            </CButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      debitor_id: "",
      projectdatas: "",
      className: "bg-success",
      message: "",
    };
  },
  methods: {
    editProject(id) {
      this.$router.push("/project/edit/" + id);
    },
    createNewproject() {
      this.$router.push({
        name: "createProject",
        path: "/project/create",
        params: {
          debitor_id: this.debitor_id,
        },
      });
    },
    deleteProject(id) {
      this.axios
        .delete("/projects/" + id)
        .then((res) => {
          if (res.status == 200) {
            this.projectDataLoad();
            this.className = "bg-success";
            this.message = "Project deleted";
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }
        })
        .catch((errro) => {
          this.projectDataLoad();
          this.className = "bg-danger";
          this.message = errro;
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        });
    },
    projectDataLoad() {
      this.axios.get("/projects?debitor_id=" + this.debitor_id).then((res) => {
        if (res.status == 200) {
          this.projectdatas = res.data.data;
        } else {
          alert("something went wrong");
        }
      });
    },
  },
  mounted() {
    this.debitor_id = this.$route.params.debitor_id;
    this.projectDataLoad();
  },
};
</script>

<style>
</style>