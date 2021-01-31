<template>
  <div id="nav">
    <router-link to="/products">Products</router-link> |
    <a v-if="authenticated" @click.prevent="logOut" > Logout </a>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  export default{
    computed: {
      ...mapGetters({
        authenticated: 'auth/authenticated'
      }),
    },
    methods: {
      ...mapActions({
        signOut: 'auth/signOut'
      }),
      logOut(){
        this.signOut().then(()=>{
          this.$router.replace({
            name: 'Login'
          })
        })
      }
    }
  }
</script>

<style media="screen">
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  cursor: pointer;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
