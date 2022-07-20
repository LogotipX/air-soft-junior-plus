<template>
  <Node :count="1" :node__in="0" :node__out="1" />
</template>

<script>
import Node from "./components/Node.vue";

export default {
  name: "App",
  components: {
    Node,
  },
};
</script>

<style lang="scss">
*,
::before,
::after {
  margin: 0;
  padding: 0;
  text-decoration: none;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
  // margin-top: 60px;
}
</style>
