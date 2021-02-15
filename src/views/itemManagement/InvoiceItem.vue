<template>
  <div>
    <CAlert class="text-white" :class="className" v-show="message">
      <li v-for="mess in message" :key="mess">{{mess}}</li>
    </CAlert>
    <h4 class="mt-3">Title</h4>
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
                <Select id="unit" class="form-control" v-model="test" @change="changeUnit($event)">
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
                <Select id="tax" class="form-control" @change="changetax($event)">
                  <option v-for="tax in texts" :value="tax.id" :key="tax.id">
                    {{ tax.name }}
                    selected=true
                  </option>
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

          <CRow>
            <CCol lg="1">
              <CButton @click="save" class="m-2" color="primary">Save</CButton>
            </CCol>

            <CCol lg="1">
              <CButton class="m-2" color="secondary">Cancel</CButton>
            </CCol>
          </CRow>
        </CCol>

        <CCol md="6">
          <CRow>
            <CCol lg="11" class="ml-3 mt-2">
              <label for class="mt-2 font-weight-bold">Labels</label>
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
      content: "",
      units: "",
      message: "",
      className: "",
      formData: {
        title: "",
        description: "",
        amount: 0,
        rate: 0,
        unit_id: "",
        tax_id: 2,
        price_calculation: true,
        active: true,
        supply_date_from: "07/01/2021",
        debitor_invoice_id: "",
        labels: [],
      },
      options: [],
      updateText: false,
      Expense: 0,
      texts: "",
      id: "",
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
    save() {
      this.axios
        .put("/items/" + this.id, this.formData)
        .then((res) => {
          if (res.status == 200) {
            this.$router.push("/overview/open-items");
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
  mounted() {
    this.axios.get("/labels").then((res) => {
      if (res.status == 200) {
        res.data.data.filter((option) => {
          this.options.push({ id: option.id, name: option.name });
        });
      }
    });

    this.id = parseInt(
      window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ]
    );
    const token = this.getTokenFromCookies;

    this.axios
      .get("/items/" + this.id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          const itemData = res.data.data;
          console.log(itemData);
          this.formData.title = itemData.title;
          this.formData.description = itemData.description;
          this.formData.amount = itemData.amount;
          this.formData.unit_id = itemData.unit_id;
          if (this.formData.unit_id == "") this.formData.unit_id = 1;

          this.formData.tax_id = itemData.tax_id;
          if (this.formData.tax_id == "") this.formData.tax_id = "2";

          this.formData.rate = itemData.rate;
          this.formData.active = itemData.active;
          this.formData.supply_date_from = itemData.supply_date_from;
          this.formData.debitor_invoice_id = itemData.debitor_invoice_id;
        }
      });

    this.axios
      .get("/units", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          this.units = res.data.data;
        }
      });

    this.axios
      .get("/taxes", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
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
