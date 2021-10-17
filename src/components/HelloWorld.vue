<template>
<div>
  <h1>{{greeting}}, Casey</h1>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data() {
    return {
      greeting: String
    }
  },
  mounted() {
    axios.get("http://localhost:8000/api").then(res => this.greeting = res.data);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
