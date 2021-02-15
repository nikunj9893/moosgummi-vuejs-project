<template>
  <div>
    <CAlert v-show="Errormessage" class="text-white" :class="classname">{{Errormessage}}</CAlert>
    <h5 class="mt-4">Create New Offer Item</h5>
    <CCard class="card-border-top">
      <CRow>
        <CCol lg="9">
          <div class="mt-3 ml-2">
            <label class="font-weight-bold">Title</label>
            <CInput v-model="formData.title" />
            <CRow>
              <CCol>
                <label class="font-weight-bold">Description</label>
                <div class>
                  <vue-editor v-model="formData.description"></vue-editor>
                </div>
              </CCol>
            </CRow>

            <CRow>
              <CCol class="ml-2">
                <label for class="mt-2 font-weight-bold">Labels</label>
                <!-- <CInput v-model="formData.labels" /> -->
                <multiselect
                  v-model="formData.labels"
                  tag-placeholder="Add this as new tag"
                  placeholder="Search or select label"
                  label="name"
                  track-by="id"
                  :options="options"
                  :multiple="true"
                  :taggable="true"
                  @tag="addTag"
                ></multiselect>
              </CCol>
            </CRow>

            <CRow class="mt-3">
              <CCol>
                <label for class="ml-2 font-weight-bold">Net Gross</label>
              </CCol>
            </CRow>
            <CRow>
              <CCol lg-3>
                <input
                  type="radio"
                  value="1"
                  name="netGross"
                  id="Gross"
                  class="ml-3"
                  v-model="formData.price_calculation"
                />
                <label for="Gross" class="ml-2 font-weight-bold">Gross</label>
                <input
                  type="radio"
                  name="netGross"
                  value="0"
                  id="net"
                  class="ml-3"
                  v-model="formData.price_calculation"
                />
                <label for="net" class="ml-2 font-weight-bold">Net</label>
              </CCol>
            </CRow>
          </div>
        </CCol>

        <!-- =================================== -->
      </CRow>
      <CRow class="mr-1 ml-1">
        <CCol lg-2>
          <label class="font-weight-bold">Price:</label>
          <CInput v-model="formData.rate" />
        </CCol>
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
          <label class="font-weight-bold">Tax</label>
          <Select id="unit" class="form-control" @change="changetax($event)">
            <option v-for="tax in texts" :value="tax.id" :key="tax.id">{{ tax.name }}</option>
          </Select>
        </CCol>
        <CCol lg-4>
          <label class="font-weight-bold">Performance Date :</label>
          <CInput type="date" v-model="formData.active_from" />
        </CCol>
      </CRow>
      <CRow>
        <CButton @click="saveOfferItem" class="m-2 ml-5" color="primary">Save</CButton>

        <CButton class="m-2" color="primary" @click="CreateTemplate">Save & create Template</CButton>
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
      units: "",
      formData: {
        title: "",
        description: "",
        turnus: 1,
        amount: 0,
        occurence: "single",
        rate: 0,
        offer_id: "230",
        unit_id: 0,
        tax_id: 0,
        price_calculation: true,
        offer_id: 0,
        active_from: "",
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
      classname: "bg-success",
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
             this.saveOfferItem();
            this.classname = "bg-success";
            this.Errormessage = "offer and template has been added";
          }
        })
        .catch((error) => {
          if (error.response.status == 422) {
            this.Errormessage = JSON.parse(
              JSON.stringify(error.response.data.errors)
            );
            this.classname = "bg-danger";
          }
        });
    },
    addTag(newTag) {
      const tag = {
        name: newTag,
      };
      this.options.push(tag);
      this.formData.labels.push(tag);
    },

    saveOfferItem() {
      if (this.formData.price_calculation == 1) {
        this.formData.price_calculation == parseInt("1");
      }
      if (this.formData.price_calculation == 0) {
        this.formData.price_calculation == parseInt("0");
      }
      this.axios
        .post("/offer-items", this.formData)
        .then((res) => {
          if (res.status == 200) {
            this.classname = "bg-success";
            this.Errormessage = "Offer has been added sucessfully";
          }
        })
        .catch((error) => {
          if (error.response.status == 422) {
            this.Errormessage = JSON.parse(
              JSON.stringify(error.response.data.errors)
            );
            this.classname = "bg-danger";
          }
        });
      //   }
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
    this.formData.offer_id = parseInt(this.$route.params.offer_id);
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
        res.data.data.filter((option) => {
          this.options.push({ id: option.id, name: option.name });
        });
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
