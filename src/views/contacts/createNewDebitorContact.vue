<template>
   <div>
      <CAlert class="text-white" :class="className" v-show="message">
         <li v-for="mess in message" :key="mess">{{ mess }}</li>
      </CAlert>
      <h4>Contact</h4>
      <CCard class="p-3">
         <CCol lg-6 class="mt-4 align-middle p-0">
            <label class="font-weight-bold">gender</label>
            <input
               type="radio"
               name="netGross"
               id="Gross"
               class="ml-3"
               v-bind:value="true"
               v-model="formData.gender"
            />
            <label for="Gross" class="ml-2 font-weight-bold">Mr</label>
            <input
               type="radio"
               name="netGross"
               id="net"
               class="ml-3"
               v-bind:value="false"
               v-model="formData.gender"
            />
            <label for="net" class="ml-2 font-weight-bold">Mrs</label>
         </CCol>
         <div class="mt-1">
            <label class="font-weight-bold">title</label>
            <CInput type="text" v-model="formData.title" />
         </div>
         <div>
            <label class="font-weight-bold">First name</label>
            <CInput type="text" v-model="formData.prename" />
         </div>
         <div>
            <label class="font-weight-bold">Surname</label>
            <CInput type="text" v-model="formData.surname" />
         </div>
         <CRow>
            <CCol md-3>
               <input
                  type="checkbox"
                  id="contract_contact"
                  class="form-check-label"
                  v-model="formData.contract_contact"
               />
               <label for="contract_contact" class="font-weight-bold ml-2"
                  >contract_contact</label
               >
            </CCol>
            <CCol md-3>
               <input
                  type="checkbox"
                  id="invoice_contact"
                  class="form-check-label"
                  v-model="formData.invoice_contact"
               />
               <label for="invoice_contact" class="font-weight-bold ml-2"
                  >invoice_contact</label
               >
            </CCol>
            <CCol md-3>
               <input
                  type="checkbox"
                  id="technical_contact"
                  class="form-check-label"
                  v-model="formData.technical_contact"
               />
               <label for="technical_contact" class="font-weight-bold ml-2"
                  >technical_contact</label
               >
            </CCol>
            <CCol md-3></CCol>
         </CRow>
         <div class="mt-2">
            <label class="font-weight-bold">e-mail</label>
            <CInput type="email" v-model="formData.email" />
         </div>
         <div>
            <label class="font-weight-bold">Comments</label>
            <CInput type="text" v-model="formData.Comments" />
         </div>
         <div class="d-flex">
            <CButton @click="saveContact" class="m-2" color="primary"
               >Save</CButton
            >
            <CButton @click="save" class="m-2" color="secondary"
               >Cancel</CButton
            >
         </div>
      </CCard>
   </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
   computed: {
      ...mapGetters(["getActiveTab"]),
   },
   data() {
      return {
         message: "",
         className: "",
         formData: {
            debitor_id: 0,
            gender: true,
            prename: "",
            surname: "",
            email: "",
            technical_contact: true,
            contract_contact: true,
            invoice_contact: true,
            title: "",
            Comments: "",
         },
      };
   },
   methods: {
      ...mapActions(["SetActiveTab"]),
      saveContact(params) {
         this.axios
            .post("/contacts", this.formData)
            .then((res) => {
               if (res.status == 200) {
                //  this.$router.back();
                  this.$router.push({
                     name: "debitors",
                     path: "/debitors/" + this.formData.debitor_id,
                     params: {
                        tab: "3",
                        debitor_id: this.formData.debitor_id,
                     },
                  });
               }
            })
            .catch((error) => {
               if (error.response.status == 422) {
                  this.message = error.response.data.errors;
                  this.className = "bg-danger";
               }
            });
      },
   },
   mounted() {
      this.formData.debitor_id = parseInt(
         window.location.href.split("/")[
            window.location.href.split("/").length - 1
         ]
      );
   },
};
</script>

<style></style>
