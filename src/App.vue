<template>
  <div id="q-app" class="row justify-center">
    <q-layout ref="layout">
      <Toolbar slot="header" @drawerClick="clickDrawer()"></Toolbar>
      <SideBar slot="left"></SideBar>
      <LoadSpinner :isLoading="loading"/>
      <q-transition
        name="custom">
        <router-view class="layout-view"/>
      </q-transition>
   </q-layout>
  </div>
</template>

<script>
import { registerGlobalComponents } from './app/GlobalComponentsLoader'
import { mapActions, mapState } from 'vuex'

registerGlobalComponents()
export default {
  methods: {
    ...mapActions(['retrieve_days']),
    clickDrawer() {
      this.$refs.layout.toggleLeft()
    }
  },
  async mounted() {
    await this.retrieve_days()
  },
  computed: {
    ...mapState(['days', 'loading'])
  }
}
</script>

<style>
  .custom-enter-active {
    transition: all .5s ease;
    opacity: 0.5;
  }
  .custom-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .custom-enter, .custom-leave-to {
    transform: translateX(100px);
    opacity: 0;
  }
  striped {
    color: yellow
  }
</style>
