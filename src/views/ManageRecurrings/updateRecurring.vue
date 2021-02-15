<template>
   <div>
      <h4 class="mt-4">Add Item</h4>
      <CCard class="card-border-top">
         <CRow>
            <CCol lg="6">
               <div class="mt-3 ml-3">
                  <label class="font-weight-bold">Title</label>
                  <CInput v-model="formData.title" />
                  <CRow>
                     <CCol lg-2>
                        <label class="font-weight-bold">Amount:</label>
                        <CInput v-model="formData.amount" />
                     </CCol>
                     <CCol lg-2>
                        <label class="font-weight-bold">Unit</label>
                        <Select
                           id="unit"
                           class="form-control"
                           @change="changeUnit($event)"
                        >
                           <option
                              v-for="tech in units"
                              :value="tech.id"
                              :key="tech.id"
                              >{{ tech.name }}
                           </option>
                        </Select>
                     </CCol>
                     <CCol lg-2>
                        <label class="font-weight-bold">Fee:</label>
                        <CInput v-model="formData.rate" />
                     </CCol>
                     <CCol lg-2>
                        <label class="font-weight-bold">Tax</label>
                        <Select
                           id="unit"
                           class="form-control"
                           @change="changetax($event)"
                        >
                           <option
                              v-for="tax in texts"
                              :value="tax.id"
                              :key="tax.id"
                              >{{ tax.name }}
                           </option>
                        </Select>
                     </CCol>
                  </CRow>

                  <CRow>
                     <CCol lg-6 class="mt-1">
                        <label class="font-weight-bold">Rotation</label>
                        <Select
                           id="unit"
                           class="form-control"
                           v-model="formData.turnus"
                        >
                           <option value="1">Monthly</option>
                           <option value="3">quartely base</option>
                           <option value="6">Half Yearly</option>
                           <option value="12">Yearly</option>
                        </Select></CCol
                     >
                     <CCol lg-6 class="mt-4 align-middle">
                        <label class="font-weight-bold">Tax</label>
                        <input
                           type="radio"
                           name="netGross"
                           id="Gross"
                           class="ml-3"
                        />
                        <label for="Gross" class="ml-2 font-weight-bold">
                           Total including VAT</label
                        >
                        <input
                           type="radio"
                           name="netGross"
                           id="net"
                           class="ml-3"
                        />
                        <label for="net" class="ml-2 font-weight-bold">
                           Total plus VAT</label
                        ></CCol
                     >
                  </CRow>

                  <CRow class="mt-3">
                     <CCol lg-6>
                        <label class="font-weight-bold">From Date:</label>
                        <CInput type="date" v-model="formData.active_from" />
                     </CCol>
                     <CCol lg-6>
                        <label class="font-weight-bold">Active Until:</label>
                        <CInput type="date" v-model="formData.active_until" />
                     </CCol>
                  </CRow>

                  <CRow class="mt-2">
                     <CCol lg-6>
                        <label class="font-weight-bold">Type</label>
                        <CInput type="text" v-model="formData.type" />
                     </CCol>
                     <CCol lg-6>
                        <label class="font-weight-bold">Sub Type</label>
                        <CInput type="text" v-model="formData.subtype" />
                     </CCol>
                  </CRow>

                  <div class="">
                     <label class="font-weight-bold">Attributes</label>
                     <div
                        class="form-group  d-flex flex-row align-items-center"
                        v-for="(input, k) in inputs"
                        :key="k"
                     >
                        <input
                           type="text"
                           class="form-control formDyanmic"
                           v-model="input.name"
                        />
                        <span class="ml-2">
                           <a
                              @click="remove(k)"
                              v-show="k || (!k && inputs.length > 1)"
                              class=" mt-2"
                           >
                              <i class="cil-trash " color="black"></i
                           ></a>
                           <a @click="add(k)" v-show="k == inputs.length - 1">
                              <i class="cil-plus" color="black"></i
                           ></a>
                        </span>
                     </div>
                  </div>
               </div>
               <CRow>
                  <CCol lg="1">
                     <CButton @click="save" class="m-2" color="primary">
                        Save
                     </CButton>
                  </CCol>

                  <CCol lg="4">
                     <CButton @click="save" class="m-2" color="primary">
                        Save & Create Templates
                     </CButton>
                  </CCol>
               </CRow>
               <CButton class="m-2" color="secondary">
                  Cancel
               </CButton>
            </CCol>

            <CCol md="6">
               <CRow>
                  <CCol lg="11" class="ml-3 mt-2">
                     <label for="" class="mt-2 font-weight-bold">Labels</label>
                     <!-- <CInput v-model="formData.labels" /> -->
                     <multiselect
                        v-model="formData.labels"
                        tag-placeholder="Add this as new tag"
                        placeholder="Search or add a tag"
                        label="name"
                        track-by="code"
                        :options="options"
                        :multiple="true"
                        :taggable="true"
                        @tag="addTag"
                     ></multiselect>
                  </CCol>
               </CRow>
               <CRow>
                  <CCol lg="12">
                     <div class="m-3">
                        <vue-editor v-model="formData.description"></vue-editor>
                     </div>
                  </CCol>
               </CRow>
            </CCol>
         </CRow>
      </CCard>
   </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { mapActions, mapGetters } from "vuex";
import Multiselect from "vue-multiselect";

export default {
   components: {
      VueEditor,
      Multiselect,
   },

   data() {
      return {
         inputs: [
            {
               name: "",
            },
         ],
         content: "",
         units: "",
         formData: {
            debitor_id: 6,
            title: "string",
            description: "string",
            amount: 0,
            rate: 0,
            unit_id: 1,
            tax_id: 1,
            price_calculation: true,
            active: true,
            turnus: "",
            active_from: "2021-01-29",
            active_until: "2021-01-30",
            offer_id: null,
            parent_id: null,
            type: "string",
            subtype: "string",
            extra: "string",
            comments: "string",
            labels: [],
         },
         updateText: false,
         Expense: 0,
         texts: "",
         id: "",
         options: [],
         text: "",
         recurringId: "",
      };
   },
   computed: {
      hasPagination() {
         return this.totalPages > 1;
      },
      ...mapGetters(["getTokenFromCookies"]),
   },
   methods: {
      add(index) {
         this.inputs.push({ name: "" });
      },
      remove(index) {
         this.inputs.splice(index, 1);
      },

      addTag(newTag) {
         const tag = {
            name: newTag,
         };
         this.options.push(tag);
         this.formData.labels.push(tag);
      },

      save() {
         this.formData.extra = this.inputs;
         this.axios
            .put("/recurrings/" + this.recurringId, this.formData)
            .then((res) => {
               if (res.status == 200) {
                  this.$router.push("/overview/recurrings");
               }
            })
            .catch((error) => {
               if (error.response.status == 422) {
                  alert(error.response.data.errors);
               }
            });
      },
      changeUnit(event) {
         this.formData.unit_id =
            event.target.options[event.target.options.selectedIndex].value;
      },
      changetax(event) {
         this.formData.tax_id =
            event.target.options[event.target.options.selectedIndex].value;
      },
   },
   mounted(params) {
      this.recurringId = parseInt(
         window.location.href.split("/")[
            window.location.href.split("/").length - 1
         ]
      );

      this.axios.get("/recurrings/" + this.recurringId).then((res) => {
         if (res.status == 200) {
            this.formData.debitor_id = res.data.data.debitor_id;
            this.formData.title = res.data.data.title;
            this.formData.description = res.data.data.description;
            this.formData.amount = res.data.data.amount;
            this.formData.rate = res.data.data.rate;
            this.formData.unit_id = res.data.data.unit_id;
            this.formData.tax_id = res.data.data.tax_id;
            this.formData.active = res.data.data.active;
            this.formData.turnus = res.data.data.turnus;
            this.formData.unit_id = res.data.data.unit_id;
            this.formData.active_from = res.data.data.active_from;
            this.formData.active_until = res.data.data.active_until;
            this.formData.offer_id = res.data.data.offer_id;
            this.formData.parent_id = res.data.data.parent_id;
            this.formData.type = res.data.data.type;
            this.formData.subtype = res.data.data.subtype;
            this.formData.extra = res.data.data.extra;
            this.formData.labels = res.data.data.labels;
         }
      });
      this.axios.get("/units", { params }).then((res) => {
         if (res.status == 200) {
            this.units = res.data.data;
         }
      });

      this.axios.get("/labels").then((res) => {
         if (res.status == 200) {
            this.options = res.data.data;
         }
      });

      this.axios.get("/taxes", { params }).then((res) => {
         if (res.status == 200) {
            this.texts = res.data.data;
         }
      });
   },
};
</script>
<style scoped>
.card-border-top {
   border-top: 3px solid #3c8dbc;
}
.formDyanmic {
   max-width: 350px;
}
</style>
