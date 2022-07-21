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
        {{ nodeLevel }}
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
      structuredNodes: [],
      nodesArr: [
        // {
        //   nodes: [
        //     {
        //       nodes: [
        //         {
        //           nodes: [
        //             {
        //               nodes: [
        //                 {
        //                   nodes: [{ nodes: null, title: "5 Node 1.1.1.1.1.1" }],
        //                   title: "4 Node 1.1.1.1.1",
        //                 },
        //                 {
        //                   nodes: [{ nodes: null, title: "5 Node 1.1.1.1.2.1" }],
        //                   title: "4 Node 1.1.1.1.2",
        //                 },
        //               ],
        //               title: "3 Node 1.1.1.1",
        //             },
        //           ],
        //           title: "2 Node 1.1.1",
        //         },
        //       ],
        //       title: "1 Node 1.1",
        //     },
        //     {
        //       nodes: [
        //         {
        //           nodes: [
        //             {
        //               nodes: [
        //                 {
        //                   nodes: [{ nodes: null, title: "5 Node 1.2.1.1.2.1" }],
        //                   title: "4 Node 1.2.1.1.2",
        //                 },
        //                 {
        //                   nodes: [{ nodes: null, title: "5 Node 1.2.1.1.1.2" }],
        //                   title: "4 Node 1.2.1.1.1",
        //                 },
        //               ],
        //               title: "3 Node 1.2.1.1",
        //             },
        //           ],
        //           title: "2 Node 1.2.1",
        //         },
        //       ],
        //       title: "1 Node 1.2",
        //     },
        //   ],
        //   title: "0 Node 1",
        // },
      ],
    };
  },

  created() {
    this.getNodesArr();
  },

  methods: {
    async getNodesArr() {
      const nodesFromApi = await getNodes();
      // console.log(nodesFromApi);
      this.nodesArr = nodesFromApi;
      this.getArrayNestingLevel(this.nodesArr);
      this.prepareStructuredNodes();
      this.createStructuredNodesArray();
      // console.log(this.structuredNodes);
    },

    getArrayNestingLevel(arr, level = 0) {
      if (Array.isArray(arr)) {
        level += 1;
        arr.forEach((node) => {
          this.getArrayNestingLevel(node.nodes, level);
        });
      } else {
        if (level >= this.nodesArrNesting) {
          this.nodesArrNesting = level;
        }
      }
    },

    prepareStructuredNodes() {
      for (let i = 0; i < this.nodesArrNesting; i++) {
        this.structuredNodes.push([]);
      }
    },

    createStructuredNodesArray(arr = this.nodesArr, curLvl = 0) {
      arr.forEach((arrNode) => {
        this.structuredNodes[curLvl].push(arrNode);

        if (arrNode.nodes !== null) {
          this.createStructuredNodesArray(arrNode.nodes, curLvl + 1);
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
