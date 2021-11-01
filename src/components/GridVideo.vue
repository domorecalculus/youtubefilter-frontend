<template>
  <div class="video-container" @click="goToVideo">
    <img class="video-thumbnail" :src="thumbnail">
    <div class="description-container">
      <img class="video-channel-thumbnail" :src="channelThumbnail">
      <div class="video-title-container">
        <p>{{this.title}}</p>
        <p>{{this.datePublished}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    title: String,
    datePublished: String,
    thumbnail: String,
    channelThumbnail: String,
  },
  methods: {
    goToVideo() {
      this.$router.push("/watch/" + this.id);
    }
  }
}
</script>

<style>
.video-container {
  margin: 15px;
}

.video-channel-thumbnail {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.description-container {
  display: flex;
  width: 240px;
}
</style>