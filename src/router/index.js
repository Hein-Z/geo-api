import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Profile from '@/components/Profile'
import SignUp from '@/components/SignUp'
import Login from "../components/Login";
import firebase from "firebase";

Vue.use(Router)

const router= new Router({
  mode:'history'
  ,routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta:{
        requiresAuth:true
      }
    },{
      path: '/profile/:id',
      name: 'Profile',
      component: Profile,
      meta:{
        requiresAuth:true
      }
    },
    {
      path:'/sign-up',
      name: 'SignUp',
      component: SignUp
    },{
      path:'/login',
      name: 'Login',
      component:Login
    },
  ]
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if(firebase.auth().currentUser){
      next();
    }else {
      next({name:'Login'});
    }
  }else {
    next();
  }
});

export default router;
