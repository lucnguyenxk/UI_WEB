<template>
  <div id="app">
    <TheMenu/>
    <TheHeader/>
    <TheContent/>
  </div>
</template>

<script>
import TheMenu from './components/theMenu'
import TheHeader from './components/theHeader'
import TheContent from './components/theContent'
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
@import './style/general.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
