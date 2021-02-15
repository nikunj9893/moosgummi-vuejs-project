<template>
  <CSidebar
    fixed
    :minimize="minimize"
    :show="show"
    colorScheme="light"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none pt-2" >
      <h5
        class="c-sidebar-brand-full"
        size="custom-size"
        :height="35"
        viewBox="0 0 556 134"
      >Mass <strong>rubber</strong></h5>

       <h5
       class="c-sidebar-brand-minimized"
        size="custom-size"
        :height="35"
        viewBox="0 0 110 134"
      >M <strong> G</strong></h5>

    </CSidebarBrand>

    <CRenderFunction flat :content-to-render="$options.nav" class="bg-white"/>
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import nav from "./_nav";

export default {
  name: "TheSidebar",
  nav,
  computed: {
    show() {
      return this.$store.state.sidebarShow;
    },
    minimize() {
      return this.$store.state.sidebarMinimize;
    },
  },
};
</script>
