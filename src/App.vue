<template>
  Array nesting: {{ nodesArrNesting }}
  <div v-for="node in nodesArr" :key="node" class="nodes__container">
    <node-block :title="node.title" :isFirstNode="true" :nodes="node.nodes" />
  </div>
</template>

<script>
import NodeBlock from "./components/NodeBlock.vue";

export default {
  name: "App",
  components: {
    NodeBlock,
  },
  data() {
    return {
      nodesArrNesting: 0,
      nodesArr: [
        {
          nodes: [
            {
              nodes: [
                {
                  nodes: null,
                  title: "Node 1.1.1",
                },
              ],
              title: "Node 1.1",
            },
            {
              nodes: [
                {
                  nodes: null,
                  title: "Node 1.2.1",
                },
                {
                  nodes: null,
                  title: "Node 1.2.2",
                },
              ],
              title: "Node 1.2",
            },
          ],
          title: "Node 1",
        },
      ],
    };
  },

  mounted() {
    this.getArrayNestingLevel(this.nodesArr);
  },

  methods: {
    getArrayNestingLevel(arr, level = 0) {
      arr.forEach((node) => {
        if (node.nodes !== null) {
          level += 1;
          this.getArrayNestingLevel(node.nodes, level);
        } else {
          if (level > this.nodesArrNesting) {
            this.nodesArrNesting = level;
          }
        }
      });

      // if (Array.isArray(arr)) {
      //   level += 1;
      //   this.getArrayNestingLevel(arr[level], level);
      // } else {
      //   throw new Error(
      //     `Function 'getArrayNestingLevel()' expected first arg type 'Array', got ${typeof arr}`
      //   );
      // }
    },
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
