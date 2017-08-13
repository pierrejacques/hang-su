<template lang="html">
  <div class="browser">
		<main :class="{blur: isBigView}">
			<section class="detail" :class="{'loading': isDetailLoading}">
				<img :src="detailSrc"  @click="toOpenBig">
			</section>
			<section class="grids">
				<div class="grid" v-for="(pic, idx) in pics" @click="toSelect(idx)"></div>
			</section>
		</main>
    <section class="big-view" v-if="isBigView" :class="{'loading': isDetailLoading}" >
      <img :src="detailSrc" @click="toPost()">
      <div class="heat-area left-area" v-if="hasPre()">
        <div class="slider-btn left-btn" @click="toPre()"></div>
      </div>
      <div class="heat-area right-area" v-if="hasPost()">
        <div class="slider-btn right-btn" @click="toPost()"></div>
      </div>
      <div class="close-btn" @click="toCloseBig()"></div>
    </section>
  </div>
</template>

<script>
import $ from 'jquery'
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
      isDetailLoading: true,
      isBigView: false,
      current: undefined
    }
  },
  methods: {
    isValid (idx) {
      return idx >= 0 && idx < this.pics.length
    },
    hasPre (idx) {
      return this.isValid(this.current - 1)
    },
    hasPost (idx) {
      return this.isValid(this.current + 1)
    },
    toPre () {
      if (this.hasPre()) {
        this.toSelect(this.current - 1)
      }
    },
    toPost () {
      if (this.hasPost()) {
        this.toSelect(this.current + 1)
      }
    },
    toSelect (idx = 0) {
      if (this.isValid(idx)) {
        this.isDetailLoading = true
        api.getImg(this.pics[idx], url => {
          this.detailSrc = url
          this.current = idx
          this.isDetailLoading = false
        })
      }
    },
    toOpenBig () {
      this.isBigView = true
    },
    toCloseBig () {
      this.isBigView = false
    }
  },
  created () {
    const getIcon = () => {
      $(document).ready(() => {
        const gridArr = $('.grid')
        api.getImg(`${this.name}.jpg`, url => {
          this.pics.forEach((val, idx) => {
            const grid = gridArr.eq(idx)
            const y = -Math.floor(idx / 4) * 100
            const x = -(idx % 4) * 100
            grid.css('background-image', `url(${url})`)
            grid.css('background-position', `${x}px ${y}px`)
          })
        })
      })
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
	width: 100vw;
	padding: 0 10vw;
	min-width: 1000px;
	box-sizing: border-box;
}

/* detail */
.detail, .grids {
  display: inline-block;
  position: relative;
	height: 80vh;
}
.detail::before, .big-view::before {
  content: '';
  position: absolute;
  left: 0; right: 0; top: 0; bottom: 0;
  background: white;
  transition: 0.2s;
  opacity: 0;
  pointer-events: none;
}
.detail {
	width: calc(100% - 70px - 470px);
	margin-right: 70px;
}
.loading::before {
  opacity: 0.8;
}
.detail > img {
	position: absolute;
	top: 0; left: 50%;
	transform: translate(-50%, 0);
  max-width: 100%;
  max-height: 100%;
  cursor: zoom-in;
}

/* grids */
.grids {
  width: 460px;
  overflow-y: auto;
}
.grid {
  display: inline-block;
  width: 100px;
  height: 100px;
  background: white;
  margin: 0 10px 5px 0;
  line-height: 0;
  background: gray;
  background-size: 400px; /* 100 * 4 */
  cursor: pointer;
}

/* big-view */
.big-view {
  display: flex;
  position: fixed;
  z-index: 10;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.8);
}
.big-view > img {
  max-width: 90%;
  max-height: 90%;
  margin: auto;
  box-shadow: 0 2px 10px hsla(0, 0%, 0%, 0.7);
}

/* big view 翻图 */
/* 翻图btn */
.heat-area:hover .slider-btn {
  opacity: 1;
}
.slider-btn, .close-btn {
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

/* close-btn */
.close-btn {
  transform: translate(50%, -50%);
  right: 0; top: 0;
  width: 150px;
  height: 150px;
  opacity: 0.3;
  background: black;
}
.close-btn:hover {
  opacity: 0.5;
}
.close-btn::before, .close-btn::after {
  content: '';
  z-index: 10;
  position: absolute;
  bottom: 25%;
  left: 35%;
  width: 5px;
  height: 20px;
  background: white;
}
.close-btn::before {
  transform: rotate(45deg);
}
.close-btn::after {
  transform: rotate(-45deg);
}
	
/* main blur */
main.blur {
	filter: blur(10px);
}
</style>
