<template>
  <nav class="navbar  navbar-light" style="background-color: #e3f2fd;">
    <div class="container">
      <router-link tag="a" class="navbar-brand" :to="{name: 'Home'}">Ninja Geo</router-link>
      <ul class="navbar-nav ml-auto d-flex" style="flex-direction: row" >
        <li class="nav-item mr-2 p-1" v-if="!user">
          <router-link tag="a" class="nav-link" :to="{name:'Login'}">Login</router-link>
        </li>
        <li class="nav-item mr-2 p-1" v-if="user">
          <h5 class="nav-link" style="cursor: default">{{user.email}}</h5>
        </li>
        <li class="nav-item mr-2 p-1" v-if="user">
          <a class="nav-link" @click="signOut" style="cursor: pointer">Sign out</a>
        </li>
        <li class="nav-item p-1" v-if="!user">
          <router-link tag="a" :to="{name:'SignUp'}" class="nav-link">Sign Up</router-link>
        </li>

      </ul>
    </div>
  </nav>
</template>
<script>
import firebase from 'firebase'
export default {
  data(){
    return {
      user:null,
    }
  },
  methods:{
    signOut(){
      firebase.auth().signOut().then(_=>this.$router.push({name:'Login'}));
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user=>this.user=user?user:null);

  }
}

</script>
