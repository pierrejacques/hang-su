<template lang="html">
  <div class="showcase">
    <h2 class="title">Client Showcase</h2>
    <h3 class="subtitle">Summer 2017</h3>
    <album name="lyn"></album>
    <album name="lch"></album>
    <album name="zwy"></album>
  </div>
</template>

<script>
import album from './components/album'
export default {
  name: 'showcase',
  components: {
    album
  }
}
</script>

<style lang="css" scoped>
.showcase {
  flex-grow: 1;
}
.showcase .title, .showcase .subtitle {
  display: block;
  text-align: center;
  font-weight: 300;
}
.title {
  font-size: 2em;
  margin: 80px 0 0;
  color: #555;
}
.subtitle {
  font-size: 1em;
  line-height: 0;
  margin-bottom: 80px;
}
</style>
