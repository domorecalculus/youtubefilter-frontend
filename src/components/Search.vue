<template>
  <div class="search-container">
    <v-text-field v-model="search" solo append-icon="mdi-magnify" @click:append="submit" @keyup.enter="submit"></v-text-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: ""
    }
  },
  methods: {
    async submit() {
      const res = await axios.get("/api/channels/search", {headers: {"Authorization": "Bearer " + localStorage.getItem("token")}});
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