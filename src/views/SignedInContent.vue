<template>
  <div>
    <div v-if="$root.$data.isLoggedIn" id="header">
      <router-link id="home-link" to="/feed">Youtube Without Recommendations</router-link>
      <v-btn @click="signout">Sign Out</v-btn>
    </div>
    <search></search>
    <router-view></router-view>
  </div>
</template>

<script>
import Search from '../components/Search.vue'
export default {
  components: { Search },
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

#home-link {
  text-decoration: none;
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
}

</style>