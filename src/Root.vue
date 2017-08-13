<template>
  <div id="root">
    <header>
      <hgroup>
        <h1 class="title">HANG SU </h1>
        <!-- <h4 class="subtitle">PHOTOGRAPHY</h4> -->
      </hgroup>
      <nav class="header-nav">
        <ul>
          <li v-for="nav in navs"
              @click="pushRoute(nav)"
              :class="{'active': isActive(nav)}">
            {{transform(nav)}}
          </li>
        </ul>
      </nav>
    </header>
    <router-view></router-view>
    <footer>
      <span class="copyright">© 2017 by HANG SU</span>
      <span class="links">
        <span class="iconfont icon-wechat"><img class="wechat-code" src="./wechat.jpg"></span>
        <a target="_blank" href="http://weibo.com/b1ackcube" class="iconfont icon-weibo"></a>
        <a target="_blank" href="https://www.instagram.com/bompea_su/" class="iconfont icon-instagram"></a>
      </span>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      navs: [
        'home',
        'portfilio',
        'daily',
        'showcase',
        'about'
      ]
    }
  },
  methods: {
    pushRoute (nav) {
      this.$router.push({ name: nav })
    },
    isActive (nav) {
      return nav === this.$route.name
    },
    transform (nav) {
      const arr = nav.split('')
      arr[0] = arr[0].toUpperCase()
      return arr.join('')
    }
  }
}
</script>

<style scoped>
* {
  font-family: 'Open Sans', sans-serif;
}
#root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
header, footer { /* 宽度 1000 */
  box-sizing: border-box;
  width: 100%;
  padding: 30px calc(50vw - 500px) 20px;
}
hgroup, nav {
  display: inline-block;
  margin: 0;
}
hgroup {
  width: 40%;
}
.title, .subtitle {
  display: inline;
}
.subtitle {
  color: silver;
  margin-left: 5px;
}
/* .subtitle::before {
  content: ' | ';
  vertical-align: 0.2em;
  margin: 0 5px 0 0;
} */
nav {
  width: 59%;
}
li {
  display: inline-block;
  width: 19%;
  font-size: 0.9rem;
  font-weight: 300;
  text-align: center;
  cursor: pointer;
  opacity: 0.4;
}
li:hover, li.active {
  opacity: 1;
}

footer {
  padding-top: 20px;
}
.copyright {
  color: gray;
  font-size: 0.7rem;
  font-weight: 300;
}
.links {
  float: right;
}
.links > a,
.links > span,
.links > a:active {
  position: relative;
  color: gray;
  text-decoration: none;
}
.icon-wechat:hover { color: lightgreen; }
.icon-weibo:hover { color: red; }
.icon-instagram:hover { color: violet; }
.wechat-code {
  display: none;
  position: absolute;
  right: 10px;
  bottom: 20px;
  width: 200px;
}
span:hover > .wechat-code {
  display: block;
}
</style>
