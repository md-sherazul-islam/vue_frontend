<template>
  <div class="loginscreen">
      <div class="form-side">
        <div class="form-section">
          <h1>Sign in</h1>
          <p class="signup-p">Login using email and password</p>
          <form @submit.prevent="loginUser">
            <div class="form-group">
              <label for="name"> Your e-mail </label>
              <input type="email" name="email" v-model="form.email" value="">
            </div>
            <div class="form-group">
              <label for="name"> Password </label>
              <input type="password" name="password" v-model="form.password" value="">
            </div>
            <div class="form-group">
              <button  type="submit" name="button">Sign in</button>
            </div>
          </form>
        </div>
      </div>
      <div class="imagescreen">
        <div class="image">
          <img src="images/1.jpg" alt="">
        </div>
      </div>
    </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default{
    name : "Login",
    data(){
      return {
        form: {
          email: '',
          password: '',
        }
      }
    },
    methods:{
      ...mapActions({
        signinUser: 'auth/loginUser'
      }),
      async loginUser(){
        this.signinUser(this.form).then(()=>{
          this.$router.replace({
            name: 'Products'
          })
        })
      }
    }
  }
</script>

<style scoped>
/*Login CSS Script */
*{
margin: 0;
padding: 0;
}
.loginscreen{
height: 100vh;
width: 100%;
display: flex;
}
.form-side{
position: relative;
width: 45%;
height: 100%;

}
.form-side h1{
margin-bottom: 10px;
}
.form-side p{
font-size: 18px;
margin-bottom: 20px;
color: grey;
}
.imagescreen{
position: relative;
width: 55%;
height: 100%;
background: #5b22c0;
border-top-left-radius: 10%;
}
.image{
position: absolute;
height: 60%;
width: 60%;
border-radius: 5%;
overflow: hidden;
top: 50%;
left: 50%;
transform: translate(-50%,-50%) rotate(40deg);
opacity: .4;

}
.image img{
height: 100%;
width: 100%;
}
.form-group{
padding: 5px;
position: relative;
}
.form-group input[type="text"], input[type="email"], input[type="password"]{
height: 30px;
width: 340px;
font-size: 1rem;
padding: 0 7px;
border-radius: 5px;
outline: none;
border: 1px solid #dcdcd0;
}
.form-group input[type="text"]:focus{
border: 1px solid #5b22c0;
}
.form-group input[type="email"]:focus{
border: 1px solid #5b22c0;
}

.form-group input[type="button"], input[type="submit"], button{
width: 340px;
text-align: center;
background: #5b22c0;
outline:none;
padding:10px;
font-size: 1rem;
border-radius: 5px;
border: none;
color: lightgrey;
cursor: pointer;
}
.form-group label{
display: block;
margin-bottom: 4px;
margin-left: 5px;
color: grey;
}
.form-section{
position: absolute;
top: 50%;
left: 50%;

transform: translate(-50%, -50%);
}
.login_p{
text-align: center;
margin-top: 20px;
}

@media only screen and (max-width: 850px) {
.loginscreen{
  display: flex;
  flex-direction: column;
  height: 110vh;
}
.form-side{
  width: 100%;
  z-index: 1;
}
.form-section h1{
  position: relative;
  top: -20vh;
  color: #eee;
}
.signup-p{
  position: relative;
  top: -20vh;
  color: white;
}
.imagescreen{
  width: 100%;
  position: absolute;
  top: 0;
  height: 20vh;
  border-radius: 0;
}
.imagescreen .image{
  display: none;
}
}

</style>
