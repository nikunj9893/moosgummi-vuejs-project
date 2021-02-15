<template>
  <div>
    <div class="btn-align">
      <h4>Parcels</h4>
      <CButton class="bg-primary text-white mb-1" @click="createNewParcel">New Parcels</CButton>
    </div>
    <CCard class="card-border-top">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Parcels</th>
            <th scope="col">Width</th>
            <th scope="col">Height</th>
            <th scope="col">Length</th>
            <th scope="col">Weight</th>
            <td>{{parcel.length}}</td>
            <td>{{parcel.tracking_no}}</td>
            <td>{{parcel.label_url}}</td>
            <td>{{parcel.shipment_price}}</td>
          </tr>
        </thead>
      </table>
    </CCard>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parcelsData: "",
    };
  },
  methods: {
    createNewParcel() {
      this.$router.push("/parcels/create");
    },
  },
  mounted() {
    this.axios.get("/parcels").then((res) => {});
    if (res.status == 200) {
      if (res.data.data.length) {
        this.parcelsData = res.data.data;
      }
    }
  },
};
</script>

<style>
.card-border-top {
  border-top: 3px solid #3c8dbc;
}
.btn-align {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>