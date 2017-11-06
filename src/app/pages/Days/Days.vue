<template>
  <div class="full-width">
    <div v-for="day in days">
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
