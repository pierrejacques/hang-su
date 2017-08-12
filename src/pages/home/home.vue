<template lang="html">
  <div class="home">
    <big-slider></big-slider>
  </div>
</template>

<script>
import bigSlider from './components/big-slider'
export default {
  name: 'home',
  components: {
    bigSlider
  }
}
</script>

<style lang="css" scoped>
.home {
  flex-grow: 1;
}
</style>
