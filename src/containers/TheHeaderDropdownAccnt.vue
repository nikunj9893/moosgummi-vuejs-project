<template>
  <CButton class="text-white" @click="logout">
      <CIcon name="cil-lock-locked" /> Logout
    </CButton>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'TheHeaderDropdownAccnt',
  data () {
    return { 
      itemsCount: 42
    }
  },
  methods: {
    ...mapActions([
      'resetAuth'
    ]),
    logout() {
      this.resetAuth();
      window.location.reload();
    }
  },
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>