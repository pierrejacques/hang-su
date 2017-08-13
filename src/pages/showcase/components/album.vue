<template lang="html">
  <div class="album">
    <img :src="src" alt="" class="icon-image">
    <h4 class="name">{{title}}</h4>
    <h5 class="date">{{date}}</h5>
  </div>
</template>

<script>
import api from '@/common/utils/api'
export default {
  name: 'album',
  props: [
    'name'
  ],
  data () {
    return {
      title: 'dummy',
      date: 'dummy',
      src: undefined,
      pics: []
    }
  },
  created () {
    api.getJSON(this.name)
    .then(
      data => {
        this.title = data.title
        this.date = data.date
        this.pics = data.pics
        api.getImg(data.icon, url => {
          this.src = url
        })
      }
    )
  }
}
</script>

<style lang="css" scoped>
.album {
  display: inline-block;
  height: 250px;
  width: 280px;
  margin: 0 20px 50px;
}
.icon-image {
  width: 280px;
  height: 187px;
}
.name, .date {
  text-align: center;
  margin: 0;
  color: #555;
}
.name {
  font-weight: 400;
  font-size: 1.1em;
  margin-top: 10px;
  text-decoration: underline;
}
.date {
  font-weight: 300;
}
</style>
