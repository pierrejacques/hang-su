<template lang="html">
  <div class="big-slider">
    <div class="pics">
      <div v-for="(pic, idx) in pics"
           class="pic"
           :class="{
             'current': idx === currentPic,
             'pre': idx === getPre(),
             'post': idx === getPost(),
           }">
      </div>
    </div>
    <div class="heat-area left-area">
      <div class="slider-btn left-btn" @click="toPre()"></div>
    </div>
    <div class="heat-area right-area">
      <div class="slider-btn right-btn" @click="toPost()"></div>
    </div>
    <div class="ctrls">
      <div v-for="(pic, idx) in pics"
           class="ctrl"
           :class="{'active': idx === currentPic}"
           @click="toSelect(idx)"></div>
    </div>
  </div>
</template>

<script>
const gap = 3000 // 切换时间间隔(ms)
let timer
export default {
  name: 'bigSlider',
  data () {
    return {
      srcs: [],
      pics: [ 1, 2, 3, 4 ], // 图片数量一定要大于三，不然滑动特效会有矛盾出现
      currentPic: undefined
    }
  },
  methods: {
    toSelect (idx) {
      if (timer) {
        clearTimeout(timer)
      }
      this.currentPic = idx
      // api.getImg(this.pics[idx])
      // .then(
      //   src => {
      //     更新src
      //   }
      // )
      timer = setTimeout(() => {
        this.toPost()
      }, gap)
    },
    toPre () {
      this.toSelect(this.getPre())
    },
    toPost () {
      this.toSelect(this.getPost())
    },
    getPre () {
      return this.currentPic <= 0 ? this.pics.length - 1 : this.currentPic - 1
    },
    getPost () {
      return this.currentPic >= this.pics.length - 1 ? 0 : this.currentPic + 1
    }
  },
  created () {
    // api.getJSON('cover')
    // .then(
    //   data => {
    //     pics = data.urls,
    //   }
    // )
    this.toSelect(0)
  }
}
</script>

<style lang="css" scoped>
.big-slider {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1000px;
  height: 600px;
  background: pink;
  overflow: hidden;
}

/* 翻图btn */
.heat-area:hover .slider-btn {
  opacity: 1;
}
.slider-btn {
  position: absolute;
  top: 50%;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  background: hsla(0, 0%, 0% ,0.3);
  opacity: 0;
  transition: 0.5s;
  cursor: pointer;
}
.slider-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  width: 30px;
  height: 30px;
  border-bottom: 15px solid white;
  border-right: 15px solid white;
}
.left-btn {
  transform: translate(-50%, -50%);
  left: 0;
}
.left-btn::before {
  right: 25%;
  transform: translate(50%, -50%) rotate(135deg);
}
.right-btn {
  transform: translate(50%, -50%);
  right: 0;
}
.right-btn::before {
  left: 25%;
  transform: translate(-50%, -50%) rotate(-45deg);
}
.heat-area {
  position: absolute;
  width: 25%;
  height: 100%;
}
.left-area {
  left: 0;
}
.right-area {
  right: 0;
}



/* slider控制器 */
.ctrls {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%);
}
.ctrl {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin: 5px;
  border-radius: 50%;
  background: black;
  transition: 0.3s;
  opacity: 0.2;
}
.ctrl.active, .ctrl:hover {
  opacity: 0.5;
}

/* 图片 */
.pic {
  position: absolute;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 10px orange inset;
  background: white;
  top: 0;
  left: 0;
  visibility: hidden;
}
.current, .pre, .post {
  transition: left 1s;
  visibility: visible;
  top: 0;
}
.pre {
  left: -100%;
}
.post {
  left: 100%;
}
</style>
