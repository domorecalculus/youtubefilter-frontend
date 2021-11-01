<template>
  <div>
    <channel-search-result class="search-result" v-for="(channel, index) in searchResults" :key="index" :id="channel.id" :title="channel.title" :description="channel.description" :imgUrl="channel.imgUrl"></channel-search-result>
  </div>
</template>

<script>
import ChannelSearchResult from './ChannelSearchResult.vue'
export default {
  components: { ChannelSearchResult },
  computed: {
    searchResults() {
      console.log(this.$root.$data.searchResults);
      return this.$root.$data.searchResults.map(x => {
        return {
          id: x.id.channelId,
          title: x.snippet.channelTitle,
          description: x.snippet.description,
          imgUrl: x.snippet.thumbnails.medium.url
        };
      })
    }
  }

}
</script>

<style>
.search-result {
  margin-bottom: 20px;
}
</style>