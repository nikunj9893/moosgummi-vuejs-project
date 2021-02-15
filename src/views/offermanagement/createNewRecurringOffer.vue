<template>
  <div>
    <CAlert class="mt-3 text-white" :class="className" v-show="message">{{message}}</CAlert>
    <h4 class="mt-4">Add Recurring Item</h4>
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
                <Select id="unit" class="form-control" @change="changeUnit($event)">
                  <option v-for="tech in units" :value="tech.id" :key="tech.id">{{ tech.name }}</option>
                </Select>
              </CCol>
              <CCol lg-2>
                <label class="font-weight-bold">Fee:</label>
                <CInput v-model="formData.rate" />
              </CCol>
              <CCol lg-2>
                <label class="font-weight-bold">Tax</label>
                <Select id="unit" class="form-control" @change="changetax($event)">
                  <option v-for="tax in texts" :value="tax.id" :key="tax.id">{{ tax.name }}</option>
                </Select>
              </CCol>
            </CRow>

            <CRow>
              <CCol lg-6 class="mt-1">
                <label class="font-weight-bold">Rotation</label>
                <Select id="unit" class="form-control" v-model="formData.turnus">
                  <option value="1">Monthly</option>
                  <option value="3">quartely base</option>
                  <option value="6">Half Yearly</option>
                  <option value="12">Yearly</option>
                </Select>
              </CCol>
              <CCol lg-6 class="mt-4 align-middle">
                <label class="font-weight-bold">Tax</label>
                <input type="radio" name="netGross" id="Gross" class="ml-3" />
                <label for="Gross" class="ml-2 font-weight-bold">Total including VAT</label>
                <input type="radio" name="netGross" id="net" class="ml-3" />
                <label for="net" class="ml-2 font-weight-bold">Total plus VAT</label>
              </CCol>
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

            <div class>
              <label class="font-weight-bold">Attributes</label>
              <div
                class="form-group d-flex flex-row align-items-center"
                v-for="(input, k) in inputs"
                :key="k"
              >
                <input type="text" class="form-control formDyanmic mr-5" v-model="input.name" />
                <input type="text" class="form-control formDyanmic" v-model="input.attr2" />
                <span class="ml-2">
                  <a @click="remove(k)" v-show="k || (!k && inputs.length > 1)" class="mt-2">
                    <i class="cil-trash" color="black"></i>
                  </a>
                  <a @click="add(k)" v-show="k == inputs.length - 1">
                    <i class="cil-plus" color="black"></i>
                  </a>
                </span>
              </div>
            </div>
          </div>
          <CRow>
            <CCol lg="1">
              <CButton @click="save" class="m-2" color="primary">Save</CButton>
            </CCol>

            <CCol lg="4">
              <CButton class="m-2" color="primary" @click="CreateTemplate">Save & create Template</CButton>
            </CCol>
          </CRow>
          <CButton class="m-2" color="secondary">Cancel</CButton>
        </CCol>

        <CCol md="6">
          <CRow>
            <CCol lg="11" class="ml-3 mt-2">
              <label for class="mt-2 font-weight-bold">Labels</label>
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
        debitor_id: "",
        title: "",
        description: "",
        amount: 0,
        rate: 0,
        unit_id: "",
        tax_id: "",
        price_calculation: false,
        active: false,
        turnus: 1,
        active_from: "",
        active_until: "",
        offer_id: null,
        parent_id: null,
        occurence: "single",
        type: "",
        subtype: "",
        extra: "",
        comments: "",
        labels: [],
      },
      className: "bg-success",
      message: "",
      updateText: false,
      Expense: 0,
      texts: "",
      id: "",
      options: [],
      text: "",
    };
  },
  computed: {
    hasPagination() {
      return this.totalPages > 1;
    },
    ...mapGetters(["getTokenFromCookies"]),
  },
  methods: {
    CreateTemplate() {
      this.axios
        .post("/templates", this.formData)
        .then((res) => {
          if (res.status == 200) {
            this.save();
            this.classname = "bg-success";
            this.message = "offer and template has been added as recurring";
          }
        })
        .catch((error) => {
          if (error.response.status == 422) {
            this.classname = "bg-danger";
            this.message = error.response.data.errors;
          }
        });
    },
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
      this.formData.debitor_id = this.$route.params.debitor_id;
      this.formData.extra = this.inputs;
      this.axios
        .post("/recurrings", this.formData)
        .then((res) => {
          if (res.status == 200) {
            this.className = "bg-success";
            this.message = "Offer recurring added";
            //   this.$router.push("/overview/open-items");
          }
        })
        .catch((error) => {
          if (error.response.status == 422);
          {
            this.className = "bg-danger";
            this.message = error.response.data.errors;
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
