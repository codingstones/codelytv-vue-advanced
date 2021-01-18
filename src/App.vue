<template>
  <div id="q-app" class="row justify-center">
    <q-layout ref="layout">
      <Toolbar slot="header" @drawerClick="clickDrawer()"></Toolbar>
      <SideBar slot="left"></SideBar>
      <q-transition
        leave="fadeOut"
        enter="fadeIn">
        <router-view class="layout-view"/>
      </q-transition>
   </q-layout>
  </div>
</template>

<script>

import Vue from 'vue'
import { registerGlobalComponents } from './app/GlobalComponentsLoader'
import { mapActions } from 'vuex'
import { Loading } from 'quasar-framework'

registerGlobalComponents(Vue)
export default {
  methods: {
    ...mapActions(['retrieve_days']),
    clickDrawer() {
      this.$refs.layout.toggleLeft()
    }
  },
  async mounted() {
    Loading.show({message: 'Looking for the best Jotas in your area...'})
    await this.retrieve_days()
    Loading.hide()
  }
}
</script>

<style>
</style>
