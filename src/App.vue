<template>
  <!-- Array nesting: {{ nodesArrNesting }} -->
  <div class="nodes__container">
    <ul
      v-for="nodeLevel in nodesArrNesting"
      :key="nodeLevel"
      class="nodes__leveling"
    >
      <template v-for="node in structuredNodes" :key="node">
        <!-- Node title {{ getNodeLevel(node.title) }} -->
        <li
          v-if="Number(nodeLevel) === Number(getNodeLevel(node.title))"
          class="nodes__blocks"
        >
          <node-block
            :title="node.title"
            :isFirstNode="nodeLevel === 1"
            :nodes="node.nodes"
          />
        </li>
      </template>
    </ul>
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
      currentArrLevel: 0,
      structuredNodes: [],
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
    this.getArrayOfSelectedLevel();
  },

  methods: {
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

    getArrayOfSelectedLevel(
      arr = this.nodesArr
      // curLvl = this.currentArrLevel
    ) {
      arr.forEach((arrNode) => {
        this.currentArrLevel += 1;
        this.structuredNodes.push(arrNode);
        console.log(this.currentArrLevel);
        console.log(arrNode.title);
        if (arrNode.nodes !== null) {
          this.getArrayOfSelectedLevel(arrNode.nodes);
          this.currentArrLevel -= 2;
          // console.log(this.structuredNodes);
        }
      });
    },

    getNodeLevel(nodeTitle) {
      return nodeTitle.split(".").length;
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
