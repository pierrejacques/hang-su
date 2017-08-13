<template lang="html">
  <div class="browser">
    <section class="detail">
      <img :src="detailSrc" :class="{'loading': isDetailLoading}">
    </section>
    <section class="grids">
      <div class="grid" v-for="pic in pics"></div>
    </section>
  </div>
</template>

<script>
import api from '@/common/utils/api'
export default {
  name: 'browser',
  props: [
    'name'
  ],
  data () {
    return {
      pics: [],
      detailSrc: undefined,
      isDetailLoading: true
    }
  },
  methods: {
    isValid (idx) {
      return idx >= 0 && idx < this.pics.length
    },
    toSelect (idx = 0) {
      if (this.isValid(idx)) {
        this.isDetailLoading = true
        api.getImg(this.pics[idx])
        .then(
          url => {
            this.detailSrc = url
            this.isDetailLoading = false
          }
        )
      }
    }
  },
  created () {
    const getIcon = (idx = 0) => {
      if (this.isValid(idx)) {
        api.getIcon(this.pics[idx])
        .then(
          url => {
            // 改背景
            getIcon(idx + 1)
          }
        )
      }
    }
    api.getJSON(this.name)
    .then(
      data => {
        this.pics = data
        if (data && data.length) {
          getIcon()
          this.toSelect()
        }
      }
    )
  }
}
</script>

<style lang="css" scoped>
/* 大布局 */
.browser {
  display: flex;
  min-height: 70vh;
  background: black;
  margin: auto;
}
.detail {
  height: 70vh;
  min-width: 40%;
  background: green;
}
.grids {
  width: 520px;
  background: red;
}
.grid {
  display: inline-block;
  width: 110px;
  height: 110px;
  background: white;
  margin: 10px;
}
</style>
