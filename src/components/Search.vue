<template>
  <div class="search-container">
    <v-text-field v-model="search" solo append-icon="mdi-magnify" @click:append="submit" @keyup.enter="submit"></v-text-field>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      search: (this.$route.path == "/search") ? this.$route.query.q : '',
    }
  },
  created() {
    if (this.search !== "") {
      this.submit();
    }
  },
  methods: {
    async submit() {
      // this.$router.push("/search?q=" + encodeURIComponent(this.search));
      const res = await axios.get("/api/channels/search/", {headers: {"Authorization": "Bearer " + localStorage.getItem("token")}, params: {"q": this.search}});
      console.log(res);
      if (res.status == 200) {
        this.$set(this.$root.$data, 'searchResults', res.data.items);
        this.$router.push("/search?q=" + encodeURIComponent(this.search))
      }
    }
  }
}
</script>

<style>
.search-container {
  margin: 20px auto;
  max-width: 60ch;
}

</style>