<template>
  <div>
    <!--    profile header-->
    <h4 class="text-center py-3">{{ profile ? profile.alias : null }}'s profile</h4>
    <!--Comments-->
    <div class="card card-comments mb-3 wow fadeIn">
      <div class="card-body">
        <div class="media d-block d-md-flex pt-4" style="border-bottom: 2px solid #E3F2FD"
             v-for="(comment,index) in comments" :key="index">
          <div class="media-body text-center text-md-left ml-md-3 ml-0 ">
            <h5 class="mt-0 font-weight-bold">{{ comment.from }}</h5>
            <p>
              {{ comment.content }}
            </p>
            <small>{{ comment.timestamp }}</small>
          </div>
        </div>
      </div>
      <div class="card-header font-weight-bold">3 comments</div>
    </div>
    <!--/.Comments-->

    <!--comment form-->
    <div class="card mb-3 wow fadeIn">
      <div class="card-body">
        <!-- Default form reply -->
        <form @submit.prevent="addComment">
          <!-- Comment -->
          <div class="form-group">
            <label for="replyFormComment">Your comment</label>
            <textarea class="form-control" id="replyFormComment" rows="5" style="resize: none"
                      v-model="comment"></textarea>
          </div>

          <div class="text-center mt-4">
            <p v-if="feedback">{{ feedback }}</p>
            <button class="btn btn-info btn-md btn-block" type="submit">Post</button>
          </div>
        </form>
        <!-- comment form-->


      </div>
    </div>
  </div>
</template>

<script>
import db from '../firebase/init.js'
import firebase from 'firebase'
import moment from 'moment'

export default {
  data() {
    return {
      profile: null,
      comment: null,
      feedback: null,
      author: null,
      comments: [],
    }
  },
  methods: {
    addComment() {
      if (this.comment) {
        let date=Date.now();
        const ref = db.collection('users').doc(this.$route.params.id).collection('comments').doc();

        ref.set({
          timestamp: moment(date).format("YYYY/MMM/DD"),
          content: this.comment,
          from: this.author.data().alias
        })
          .then(_ => this.comment = null)
          .catch(err => this.feedback = "sorry something wrong");
      }

    }
    , getComment() {
      const ref = db.collection('users').doc(this.$route.params.id).collection('comments').orderBy('timestamp');
      ref.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type == 'added') {
            this.comments.unshift(change.doc.data());
          }
        })
      })
    }

  },
  created() {
    const currentUser = firebase.auth().currentUser;
    const ref = db.collection('users').doc(this.$route.params.id);

    // get currentUser
    db.collection('users').where('user_id', '==', currentUser.uid).get()
      .then(users => this.author = users.docs[0])

    // get profile
    ref.get().then(doc => this.profile = doc.data());

    //get comments
    this.getComment();
  }
}
</script>
