<template>
  <div id="app">
    <router-view></router-view>  
  </div>
</template>

<script>
  var Mousetrap = require('mousetrap');
  export default {
    name: 'm-box'
  }
  
</script>

<style>
  /* CSS */
  body {
    margin: 0;
    padding: 0;
  }
  /* a, i, button, span, input, select{
    -webkit-app-region: no-drag;
  } */
</style>
