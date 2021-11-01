<template>
  <iframe id='embedded-video' :src="'https://www.youtube.com/embed/' + this.$route.path.split('/')[2] + '?enablejsapi=1&rel=0'" frameborder='0' style='border: solid 4px rgba(255, 0, 0, 1)' allowfullscreen></iframe>
</template>

<script>
export default {

}
</script>

<style>

</style>