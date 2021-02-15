<template>
  <div>
    <CAlert class="text-white" :class="className" v-show="message">
      <li v-for="mess in message" :key="mess">{{mess}}</li>
    </CAlert>
    <h5>Create New Invoice Item</h5>
    <CAlert v-show="error" color="danger">{{Errormessage}}</CAlert>
    <CCard class="card-border-top">
      <CRow>
        <CCol lg="6">
          <div class="mt-3 ml-2">
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
                <label class="font-weight-bold">Rate:</label>
                <CInput v-model="formData.rate" />
              </CCol>
              <CCol lg-2>
                <label class="font-weight-bold">Expense:</label>
                <CInput v-model="Expense" />
              </CCol>
              <CCol lg-2>
                <label class="font-weight-bold">Tax</label>
                <Select id="unit" class="form-control" @change="changetax($event)">
                  <option v-for="tax in texts" :value="tax.id" :key="tax.id">{{ tax.name }}</option>
                </Select>
              </CCol>
              <CCol lg-2>
                <div class="m-3">
                  <input type="checkbox" id="update" class="form-check-input" v-model="updateText" />
                  <label for="update" class="font-weight-bold">Update Tax</label>
                </div>
              </CCol>
            </CRow>

            <CRow class="mt-4">
              <CCol lg-3>
                <label class="font-weight-bold">Supply Date From:</label>
                <CInput type="date" v-model="formData.supply_date_from" />
              </CCol>
              <CCol lg-3>
                <label class="font-weight-bold">Discount Type:</label>
                <CSelect label :options="['percentage', 'Fixed']" />
              </CCol>
              <CCol lg-3>
                <label class="font-weight-bold">Discount Value:</label>
                <CInput type="text" />
              </CCol>
              <CCol lg-2>
                <div class="m-4">
                  <input
                    type="checkbox"
                    id="update"
                    v-model="formData.active"
                    class="form-check-input"
                  />
                  <label for="update" class="font-weight-bold">Active</label>
                </div>
              </CCol>
            </CRow>
          </div>
          <CRow class="mt-3">
            <CCol>
              <label for class="ml-2 font-weight-bold">Net Gross</label>
            </CCol>
          </CRow>
          <CRow>
            <CCol lg-3>
              <input type="radio" name="netGross" id="Gross" class="ml-3" />
              <label for="Gross" class="ml-2 font-weight-bold">Gross</label>
              <input type="radio" name="netGross" id="net" class="ml-3" />
              <label for="net" class="ml-2 font-weight-bold">Net</label>
            </CCol>
          </CRow>

          <CRow>
            <CCol class="ml-2">
              <label for class="mt-2 font-weight-bold">Image</label>
              <CInput />
            </CCol>
          </CRow>
        </CCol>
        <CCol>
          <CRow>
            <CCol class="ml-2">
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
          <CCol>
            <div class="mt-3">
              <vue-editor v-model="formData.description"></vue-editor>
            </div>
          </CCol>
        </CCol>
        <!-- =================================== -->
      </CRow>
      <CRow>
        <CButton @click="save" class="m-2 ml-5" color="primary">Save</CButton>

        <CButton class="m-2" color="secondary" @click="cancel">Cancel</CButton>
      </CRow>
    </CCard>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { mapActions, mapGetters } from "vuex";
import Multiselect from "vue-multiselect";
import { flagSet } from "@coreui/icons";

export default {
  components: {
    VueEditor,
    Multiselect,
  },

  data() {
    return {
      content: "",
      message: "",
      className: "",
      units: "",
      formData: {
        title: "",
        description: "",
        amount: 0,
        rate: "",
        unit_id: "",
        tax_id: 2,
        price_calculation: true,
        active: true,
        supply_date_from: "07/01/2021",
        debitor_invoice_id: 0,
        labels: [],
      },
      updateText: false,
      Expense: 0,
      texts: "",
      id: "",
      options: [],
      debitor_id: "",
      debitor_name: "",
      address: [],
      error: false,
      Errormessage: "",
    };
  },
  computed: {
    hasPagination() {
      return this.totalPages > 1;
    },
    ...mapGetters(["getTokenFromCookies"]),
  },
  methods: {
    cancel()
    {
      this.$router.back()
    },
    addTag(newTag) {
      const tag = {
        name: newTag,
      };
      this.options.push(tag);
      this.formData.labels.push(tag);
    },

    save() {
      this.formData.debitor_invoice_id = this.debitor_id;
      this.axios
        .post("/items", this.formData)
        .then((res) => {
          if (res.status == 200) {
            this.$router.push("/overview/payment-pending-invoices/0");
          }
        })
        .catch((error) => {
          if (error.response.status == 422) {
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
    this.debitor_id = this.page = parseInt(
      window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ]
    );

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
</style>
