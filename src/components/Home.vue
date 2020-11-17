<template>
  <div id="map"></div>
</template>

<script>
import db from "../firebase/init.js"
import firebase from 'firebase';

export default {
  name: "Home",
  data() {
    return {
      lat: -25.344, lng: 131.036,
    }
  },
  methods: {
    randerMap() {
      // The map, centered at Uluru
      const map = new google.maps.Map(
        document.getElementById('map'),
        {
          minZoom: 4,
          maxZoom: 20,
          zoom: 15,
          center: {lat: this.lat, lng: this.lng},
        }
      );
      // The map, another user's markers
      db.collection('users').get().then(users => {
        users.docs.forEach(doc => {
          let data = doc.data();
          if (data.geo) {
            let marker = this.addMarker(data.geo.lat, data.geo.lng, map);
            marker.addListener('click', _ => this.$router.push({name: 'Profile', params: {id: doc.id}}));
          }
        })
      })
    },
    addMarker(lat, lng, map) {
      const marker = new google.maps.Marker({
        position: {lat: lat, lng: lng},
        map
      });
      return marker;
    }
  },
  mounted() {
    let user = firebase.auth().currentUser;
    if (navigator.geolocation) {
      //get user's location
      navigator.geolocation.getCurrentPosition(pos => {
        this.lat = pos.coords.latitude;
        this.lng = pos.coords.longitude;


        //set users geolocation at firebase
        db.collection('users').where('user_id', '==', user.uid)
          .get().then(snapshot => {
          snapshot.forEach(doc => {
            db.collection('users').doc(doc.id).update({
              geo: {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
              }
            })
          })
        }).then(_ => this.randerMap())
      }, err => {
        this.randerMap();
      }, {maximumAge: 60000, timeout: 3000});
    } else {
      // rander default location
      this.randerMap();
    }
  },


}
</script>


<style scoped>
#map {
  height: 90vh;
  /* The height is 400 pixels */
  width: 100%;
  /* The width is the width of the web page */
}
</style>
