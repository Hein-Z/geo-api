<template>
  <div id="app" class="container-fluid">
    <nav-bar></nav-bar>
    <router-view/>
  </div>
</template>
<script>
import NavBar from './components/Navbar.vue'
export default {
  name: 'App',
  components:{
      NavBar
  },

}
</script>

<style>

</style>
