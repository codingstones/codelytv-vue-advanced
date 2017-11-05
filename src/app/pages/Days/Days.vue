<template>
  <div class="full-width">
    <LoadSpinner :loading="loading"/>
    <div v-for="day in days" v-if="!loading">
      <Day :day="day"/>
    </div>
    <BackToTopButton/>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState(['days'])
    }
  }
</script>

<style>
</style>
