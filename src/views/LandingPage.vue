
<template>
  <div class="home">
    <div class="logo">
      <img src="../assets/Title.png" >
    </div>
    <div class="login">
      <v-card class="card" max-width="400px" elevation="2">
        <div v-if=showLogin>
          <h2>Sign In</h2>
          <v-text-field v-model="loginEmail" color="primary" label="Email" outlined></v-text-field>
          <v-text-field v-model="loginPassword" label="Password" type="password" outlined></v-text-field>
          <v-btn color="primary" @click="login">Sign In</v-btn>
          <hr>
          <p>Don't have an account?</p>
          <v-btn text color="primary" @click="showLogin=false">Create Account</v-btn>
        </div>
        <div v-else>
          <h2>Create Account</h2>
          <v-text-field v-model="registerEmail" color="primary" label="Email" outlined></v-text-field>
          <v-text-field v-model="registerPassword" label="Password" type="password" outlined></v-text-field>
          <v-text-field v-model="registerPasswordConfirm" label="Confirm Password" type="password" outlined></v-text-field>
          <p v-if="registerPassword && !passwordsMatch">Passwords must match</p>
          <p v-if="registerErrorMessage" class="error-message">{{registerErrorMessage}}</p>
          <v-btn color="primary" @click="register">Create Account</v-btn>
          <hr>
          <p>Already have an account?</p>
          <v-btn text color="primary" @click="showLogin=true">Sign In</v-btn>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    components: {
    },
    created() {
      if (localStorage.getItem("token")){
        this.$root.$data.isLoggedIn = true;
        this.$router.push("/feed");
        return;
      }
    },
    data() {
      return {
        showLogin: true,
        loginEmail: "",
        loginPassword: "",
        registerEmail: "",
        registerPassword: "",
        registerPasswordConfirm: "",
        registerErrorMessage: "",
      }
    },
    computed: {
      passwordsMatch() {
        return this.registerPassword===this.registerPasswordConfirm;
      },
      allFieldsExist() {
        return this.registerEmail && this.registerPassword && this.registerPasswordConfirm;
      }
    },
    methods: {
      async login() {
        const res = await axios.post("/auth/login/", {"username": this.loginEmail,"password": this.loginPassword})
        console.log(res);
        // this.$set(this.$root.$data, "userToken", res.data.access);
        localStorage.setItem("token", res.data.access);
        this.$root.$data.isLoggedIn = true;
        this.$router.push("/feed");
      },
      async register() {
        if (!this.allFieldsExist) {
          this.registerErrorMessage = "Please fill in all fields";
          return;
        }
        
        const res = await axios.post("/auth/register/", {"username": this.registerEmail, "email": this.registerEmail,"password": this.registerPassword})
        console.log(res);
        if (res.status === 201) {
          const res2 = await axios.post("/auth/login/", {"username": this.registerEmail,"password": this.registerPassword})
          console.log(res2);
          // this.$set(this.$root.$data, "userToken", res2.data.access);
          localStorage.setItem("token", res2.data.access);
          this.$root.$data.isLoggedIn = true;
          this.$router.push("/feed");
        }
      }
    }

}
</script>

<style >
.home {
  height: 100%;
  display: flex;
  margin: auto 0;
  padding: 0;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: nowrap;
}

.logo {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.logo > img {
  max-width: 90%;
}

.login {
  background: #efefef;
  flex-grow: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  width: 90%;
  max-width: 500px;
  margin: 0 auto;
  background: #fff;
  padding: 15px;
  font-size: 1.5em;
}

h2 {
  margin: 10px 0px;
  font-size: 1em;
}

hr {
  margin-bottom: 20px;
  margin-top: 25px;
}

p {
  font-size: .8em;
}
</style>