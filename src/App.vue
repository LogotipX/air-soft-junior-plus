<template>
  Array nesting: {{ nodesArrNesting }}
  <div class="nodes__container">
    <ul
      v-for="(nodeFromLevel, nodeLevel) in structuredNodes"
      :key="nodeFromLevel"
      class="nodes__leveling"
    >
      <li v-for="node in nodeFromLevel" :key="node" class="node__blocks">
        <node-block
          :title="node.title"
          :isFirstNode="nodeLevel === 0"
          :nodes="node.nodes"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import NodeBlock from "./components/NodeBlock.vue";
import { getNodes } from "./api.js";

export default {
  name: "App",
  components: {
    NodeBlock,
  },
  data() {
    return {
      nodesArrNesting: 0,
      currentArrLevel: 0,
      structuredNodes: [],
      nodesArr: [],
    };
  },

  created() {
    this.getNodesArr();
  },

  methods: {
    async getNodesArr() {
      const nodesFromApi = await getNodes();
      this.nodesArr = nodesFromApi;
      this.getArrayNestingLevel(this.nodesArr);
      this.prepareStructuredNodes();
      this.createStructuredNodesArray();
    },

    getArrayNestingLevel(arr, level = 0) {
      if (Array.isArray(arr)) {
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
      } else {
        throw new Error(
          `Function 'getArrayNestingLevel()' expected first arg type 'Array', got ${typeof arr}`
        );
      }
    },

    prepareStructuredNodes() {
      const nestingLevel = this.nodesArrNesting;
      for (let i = 0; i < nestingLevel; i++) {
        this.structuredNodes.push([]);
      }
    },

    createStructuredNodesArray(
      arr = this.nodesArr,
      curLvl = this.currentArrLevel
    ) {
      arr.forEach((arrNode) => {
        this.structuredNodes[curLvl].push(arrNode);

        if (arrNode.nodes !== null) {
          this.currentArrLevel += 1;
          this.createStructuredNodesArray(arrNode.nodes, this.currentArrLevel);
        } else {
          this.currentArrLevel -= 1;
        }
      });
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
  list-style-type: none;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.nodes__container {
  display: flex;
  height: 720px;
  align-items: center;

  .nodes__leveling {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
    margin: 0 2.5%;

    .nodes__blocks {
      margin: 5% 0;
    }
  }
}
</style>
