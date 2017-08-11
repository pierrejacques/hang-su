<template>
  <div id="root">
    <header>
      <h1>HANG SU</h1>
      <nav class="header-nav">
        <ul>
          <li v-for="nav in navs"
              @click="pushRoute(nav)"
              :class="{'active': isActive(nav)}">
            {{nav}}
          </li>
        </ul>
      </nav>
    </header>
    <router-view></router-view>
    <footer></footer>
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
    }
  }
}
</script>

<style scoped>
header { /* 宽度 1000 */
  box-sizing: border-box;
  width: 100%;
  padding: 50px calc(50vw - 500px);
}
h1, nav {
  display: inline-block;
  margin: 0;
}
h1 {
  width: 40%;
}
nav {
  width: 59%;
}
li {
  display: inline-block;
  width: 19%;
  font-size: 0.9rem;
  text-align: center;
  cursor: pointer;
  opacity: 0.5;
}
li:hover, li.active {
  opacity: 1;
}

</style>
