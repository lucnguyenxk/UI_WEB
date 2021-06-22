<template>
  <div id="app">
    <TheMenu/>
    <TheHeader/>
    <TheContent/>
  </div>
</template>

<script>
import TheMenu from './components/TheMenu.vue'
import TheHeader from './components/TheHeader.vue'
import TheContent from './components/TheContent.vue'
export default {
  name: 'App',
  components: {
    TheMenu,
    TheHeader,
    TheContent,
  }
}
</script>

<style>
@import './style/General.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
