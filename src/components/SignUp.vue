<template>
  <div class="row mt-md-3">
    <div class="col-12 col-md-4 offset-md-4">
      <div class="card" style="width: 100%;">
        <img src="../assets/geo.png" class="card-img-top " alt="form image">
        <div class="card-body">
          <h5 class="card-title" style="color: #B0DCEE">Registration form</h5>
          <form @submit.prevent="signUp">
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input type="email" class="form-control" placeholder="Email" v-model="email">
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input type="password" class="form-control" placeholder="Password" v-model="password">
            </div>
            <div class="mb-3">
              <label class="form-label">Alias</label>
              <input type="text" class="form-control" placeholder="Alias" v-model="alias">
            </div>
            <div class="mb-3 text-center">
              <p class="text-danger text-center" v-if="feedback">{{ feedback }}</p>
              <vue-button-spinner
                :is-loading="isLoading"
                :disabled="isLoading"
                :status="status" class="form-control ">
                <span>Submit</span>
              </vue-button-spinner>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import db from '../firebase/init.js';
import firebase from 'firebase';
import slugify from 'slugify';
import VueButtonSpinner from 'vue-button-spinner';

export default {
  data() {
    return {
      email: null,
      password: null,
      alias: null,
      feedback: null,
      isLoading: false,
      status: ''
    }
  },
  components: {
    VueButtonSpinner
  },
  methods: {
    signUp() {
      if (this.alias && this.password && this.email) {
        this.isLoading = true;
        const slug = slugify(this.alias, {
          replacement: '-',
          remove: /[*+~.()'"!:@]/g,
          lower: true,
        });

        const ref = db.collection('users').doc(slug);
        ref.get().then(doc => {
          if (doc.exists) {
            this.feedback = "This alias already exits";
            this.status = false;
            setTimeout(_ => this.status = '', 1000);
            this.isLoading = false;
          } else {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(user => {
              ref.set({
                alias: this.alias,
                geo: null,
                user_id: user.user.uid
              }).then(_ => this.$router.push({name: 'Home'}))
                .catch(error => this.feedback = error.message);

            }).catch(error => {
              this.feedback = error.message;
              this.status = false;
              setTimeout(_ => this.status = '', 1000);
              this.isLoading = false;
            });
          }
        })

      } else {
        this.feedback = 'You Must Enter All Fields';
        this.status = false;
        setTimeout(_ => this.status = '', 1000);
      }
    }
  }
}
</script>
<style>

</style>
