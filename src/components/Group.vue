<template>
  <div class="group">
    <h2>{{title}}</h2>
  </div>
</template>

<script>
export default {
  name: "group",
  props: {
    title: String,
  }
}
</script>

<style>
.group {
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 5px 5px 5px #888;
  background: #efefef;
  width: 175px;
  height: 100px;
  border-radius: 10px;
  margin-bottom: 30px;
}

.group:hover {
  transition: .2s ease-in-out all;
  transform: scale(1.05);
  cursor: pointer;
}

</style>