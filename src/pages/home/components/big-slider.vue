<template lang="html">
  <div class="big-slider">
    <div class="pics">
      <div v-for="(pic, idx) in pics"
           class="pic"
           :class="{
             'loading': !srcs[idx],
             'current': idx === currentPic,
             'pre': idx === getPre(),
             'post': idx === getPost(),
           }">
         <img :src="srcs[idx]">
      </div>
    </div>
    <div class="heat-area left-area">
      <div class="slider-btn left-btn" @click="toPre()"></div>
    </div>
    <div class="heat-area right-area">
      <div class="slider-btn right-btn" @click="toPost()"></div>
    </div>
  <!--   <div class="ctrls">
    <div v-for="(pic, idx) in pics"
         class="ctrl"
         :class="{'active': idx === currentPic}"
         @click="toSelect(idx)">
    </div>
  </div> -->
  </div>
</template>

<script>
import api from '@/common/utils/api'

const gap = 4000 // 切换时间间隔(ms)
let timer

export default {
  name: 'bigSlider',
  data () {
    return {
      srcs: [],
      pics: [], // 图片数量一定要大于三，不然滑动特效会有矛盾出现
      currentPic: undefined
    }
  },
  methods: {
    toSelect (idx) {
      if (timer) {
        clearTimeout(timer)
      }
      this.currentPic = idx
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
    },
    isValid (idx) {
      return idx >= 0 && idx < this.pics.length
    },
    getImgs (idx) {
      if (this.isValid(idx)) {
        api.getImg(this.pics[idx], url => {
          if (!this.srcs[idx]) {
            this.srcs.splice(idx, 1, url)
          }
          this.getImgs(idx + 1)
        })
      }
    }
  },
  created () {
    api.getJSON('home')
    .then(
      data => {
        this.pics = data
        if (data && data.length) {
          this.getImgs(0)
        }
        this.toSelect(0)
      }
    )
  }
}
</script>

<style lang="css" scoped>
.big-slider {
  position: relative;
  margin: auto;
  width: 100%;
  height: 662.6px; /* 100/163*108 */
  background: transparent;
  overflow: hidden;
  box-shadow: 0 2px 10px hsla(0, 0%, 50%, 0.5);
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
  background: hsla(0, 0%, 0% ,0.2);
  opacity: 0;
  transition: 0.5s;
  cursor: pointer;
}
.slider-btn::before {
  content: '';
  opacity: 0.8;
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
  background: white;
  transition: 0.3s;
  opacity: 0.2;
}
.ctrl.active, .ctrl:hover {
  opacity: 0.7;
}

/* 图片 */
.pic {
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
  top: 0;
  left: 0;
  opacity: 0;
}
.pic > img {
  width: 100%;
  height: 100%;
}
.current, .pre, .post {
  transition: left 1s, opacity 0.1s ease 1s;
  opacity: 1;
  top: 0;
}
.pre {
  left: -100%;
}
.post {
  left: 100%;
}
</style>
