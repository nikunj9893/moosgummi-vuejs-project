<template>
  <div>
    <CAlert class="text-white" v-show="message" :class="className">{{message}}</CAlert>
    <h1>Project</h1>
    <table class="table">
      <thead class="borderTop">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Customer handle</th>
          <th scope="col">Project</th>
          <th scope="col">
           <CButton class="btn-success" @click="createNewproject">
              <i class="fa fa-plus"></i>
            </CButton>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projectdata in finalProjectData" :key="projectdata.id">
          <th scope="row">{{projectdata.id}}</th>
          <td>{{projectdata.handle}}</td>
          <td>{{projectdata.name}}</td>
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
      debitorDatas: {},
      finalProjectData: [],
    };
  },
  methods: {
    editProject(id) {
      this.$router.push("/project/edit/"+id);
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
      this.debitor_id = this.$route.params.debitor_id;
      this.axios.get("/projects").then((res) => {
        if (res.status == 200) {
          this.projectdatas = res.data.data;
        } else {
          alert("something went wrong");
        }
      });
    },
  },
  mounted() {
    this.axios.get("/projects").then((res) => {
      if (res.status == 200) {
        this.projectdatas = res.data.data;
      } else {
        alert("something went wrong");
      }

      this.axios.get("/debitors").then((res) => {
        if ((res.status = 200)) {
          this.debitorDatas = res.data.data;
          this.projectdatas.filter((data) => {
            this.debitorDatas.filter((data2) => {
              if (data.debitor_id == data2.id) {
                this.finalProjectData.push({
                  handle: data2.handle,
                  name: data.name,
                  id: data.id,
                });
              }
            });
          });
          console.log(this.finalProjectData);
        }
      });
    });
  },
};
</script>

<style>
.borderTop {
  border-top: 2px solid black;
}
</style>