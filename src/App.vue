<template>
  <div class="nodes__container" ref="nodesContainer">
    <canvas
      id="node-tree-branches"
      :width="nodesContainerWidth"
      :height="nodesContainerHeight"
    ></canvas>
    <div v-for="node in nodesArr" :key="node" class="branch">
      <branches-container :node="node" @getAllCoords="constructGraphic" />
    </div>
  </div>
</template>

<script>
import { getNodes } from "./api.js";
import BranchesContainer from "./components/BranchesContainer.vue";

export default {
  name: "App",
  components: {
    BranchesContainer,
  },

  data() {
    return {
      nodesContainerWidth: 0,
      nodesContainerHeight: 0,
      nodesArr: [],
    };
  },

  created() {
    this.getNodesArr();
  },

  methods: {
    async getNodesArr() {
      this.nodesArr = await getNodes();
    },

    constructGraphic({ selfOutputCoords, childrenInputCoords }) {
      this.nodesContainerWidth = this.$refs.nodesContainer.clientWidth;
      this.nodesContainerHeight = this.$refs.nodesContainer.clientHeight;

      this.$nextTick(() => {
        for (let i = 0; i < selfOutputCoords.length; i++) {
          selfOutputCoords[i].x -=
            this.$refs.nodesContainer.getBoundingClientRect().x;

          selfOutputCoords[i].y -=
            this.$refs.nodesContainer.getBoundingClientRect().y;

          childrenInputCoords[i].x -=
            this.$refs.nodesContainer.getBoundingClientRect().x;

          childrenInputCoords[i].y -=
            this.$refs.nodesContainer.getBoundingClientRect().y;

          this.drawLines(selfOutputCoords[i], childrenInputCoords[i]);
        }
      });
    },

    drawLines(selfOutputCoords, childrenInputCoords) {
      const drawingLine = document.getElementById("node-tree-branches");
      if (drawingLine && drawingLine.getContext) {
        const context = drawingLine.getContext("2d");

        if (selfOutputCoords) {
          context.lineWidth = 2;
          context.strokeStyle = "#7555f6";
          context.beginPath();
          context.moveTo(selfOutputCoords.x + 9, selfOutputCoords.y + 7);
          context.lineTo(childrenInputCoords.x, childrenInputCoords.y + 7);
          context.closePath();
          context.stroke();
        }
      }
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
  display: block;
  position: relative;
  width: fit-content;
  align-items: center;
}

canvas {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
}
</style>
