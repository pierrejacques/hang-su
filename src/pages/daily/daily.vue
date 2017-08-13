<template lang="html">
  <div class="daily">
    <browser name="daily"></browser>
  </div>
</template>

<script>
import browser from '@/common/components/browser'
export default {
  name: 'daily',
  components: {
    browser
  }
}
</script>

<style lang="css">
.daily {
  flex-grow: 1;
}
</style>
