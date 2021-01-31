<template>
  <div>
    <login />
    <div v-if="authenticated">
      {{user}}
    </div>
  </div>
</template>

<script>
  import login from '@/components/login.vue'
  import {mapGetters} from 'vuex'
  export default{
    name: 'LoginView',
    components: {
      login
    },
    computed:{
      ...mapGetters({
        authenticated: 'auth/authenticated',
        user: 'auth/user'
      })
    }
  }
</script>
