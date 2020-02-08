<template>
  <div id="app">
    <a href="https://sazak.io" class="app__home-link">Homepage</a>
    <router-view/>
    <div class="app__desc">Developed by Ozan Sazak. This project is open source. Please refer to <a target="_blank" href="https://github.com/ozansz/sazak.io">Github</a></div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  width: 100vw;
  height: 100vh;
}
.app__home-link {
  font-size: 1.2em;
  color: #fff;
  position: absolute;
  top: 32px;
  left: 48px;
}
.app__desc {
  color: #fff;
  font-size: 1em;
  position: absolute;
  bottom: 15px;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
