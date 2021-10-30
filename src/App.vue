<template>
  <v-app id="app">
    <div v-if="$root.$data.isLoggedIn" id="header">
      <div>Youtube Without Recommendations</div>
      <v-btn @click="signout">Sign Out</v-btn>
    </div>
    <router-view/>
  </v-app>
</template>

<script>

export default {
  created() {
    if(localStorage.getItem("token")) {
      this.$root.$data.isLoggedIn = true;
    }
  },
  methods: {
    signout() {
      localStorage.removeItem("token");
      this.$root.$data.isLoggedIn = false;
      this.$router.push("/");
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background: #ff0000;
  color: #ffffff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.5em;
  font-weight: 600;
}
</style>
