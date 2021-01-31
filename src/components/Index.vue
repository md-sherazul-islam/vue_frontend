<template>
  <div>
    <div class="container">
      <div class="products">
        <div class="card">
          <div class="imageCard">
            <img src="@/assets/logo.png" alt="">
          </div>
          <div class="card-body">
            <p>lorem ipsum </p>
          </div>
        </div>
        <div class="card">
          <div class="imageCard">
            <img src="@/assets/logo.png" alt="">
          </div>
          <div class="card-body">
            <p>lorem ipsum </p>
          </div>
        </div>
        <div class="card">
          <div class="imageCard">
            <img src="@/assets/logo.png" alt="">
          </div>
          <div class="card-body">
            <p>lorem ipsum </p>
          </div>
        </div>
      </div>
    </div>
    {{user}}
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default{
    name: 'Index',

    computed: {
      ...mapGetters({
        user: 'auth/user'
      })
    },

  }
</script>

<style media="screen">
  .container{
    width: 80%;
    margin: 0 auto;
  }
  .products{
    display: flex;
    column-gap: 15px;

  }
</style>
