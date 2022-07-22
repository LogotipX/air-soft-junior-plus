<template>
  <canvas
    :id="'node-tree-branches' + node.title"
    width="1920"
    height="1080"
  ></canvas>
  <div class="branch">
    <div class="left-node-block">
      <node-block
        :title="node.title"
        :isFirstNode="isFirstNode"
        :nodes="node.nodes"
        @kickUpSelfOutputCoords="getSelfOutputCoords"
        @kickUpSelfInputCoords="getSelfInputCoords"
      />
    </div>
    <ul class="right-node-blocks">
      <template v-if="node.nodes">
        <li
          v-for="(nodeItem, idx) in node.nodes"
          :key="nodeItem + idx"
          class="node-branch"
        >
          <branches-container
            :node="nodeItem"
            :isFirstNode="false"
            @kikUpChildrenInputCoords="getChildrenInputCoords"
          />
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import NodeBlock from "./NodeBlock.vue";

export default {
  name: "BranchesContainer",
  components: { NodeBlock },

  props: {
    node: {
      type: Object,
      require: false,
    },
    isFirstNode: {
      type: Boolean,
      require: false,
      default: true,
    },
  },

  emits: ["kikUpChildrenInputCoords"],

  data() {
    return {
      selfOutputCoords: null, //[{}],
      selfInputCoords: null, // {},
      childrenInputCoords: [], //[{}],
    };
  },

  methods: {
    getSelfOutputCoords(coords) {
      // console.log("selfOutputCoords", coords);
      this.selfOutputCoords = coords;
    },

    getSelfInputCoords(coords) {
      // console.log("getSelfInputCoords", coords);
      this.selfInputCoords = coords;
      this.$emit("kikUpChildrenInputCoords", this.selfInputCoords);
    },

    getChildrenInputCoords(coords) {
      // console.log("getChildrenInputCoords", coords);
      this.childrenInputCoords.push(coords);
    },

    drawLine(selfOutputCoords, childrenInputCoords) {
      console.log("drawLine");
      console.log("selfOutputCoords", selfOutputCoords);
      console.log("childrenInputCoords", childrenInputCoords);

      const drawingLine = document.getElementById(
        "node-tree-branches" + this.node.title
      );

      if (drawingLine && drawingLine.getContext) {
        if (selfOutputCoords) {
          // console.log("outputForEach", selfOutputCoords);
          // selfOutputCoords.forEach((outputPoint) => {
          const context = drawingLine.getContext("2d");
          context.lineWidth = 1;
          context.strokeStyle = "#7555f6";
          context.beginPath();
          context.moveTo(selfOutputCoords.x + 10, selfOutputCoords.y + 7);
          context.lineTo(childrenInputCoords.x + 1, childrenInputCoords.y + 7);
          // context.moveTo(50, 50);
          // context.lineTo(0, 0);
          context.closePath();
          context.stroke();

          console.log(this.node.title);
          console.log("output", selfOutputCoords.x, selfOutputCoords.y);
          console.log("input", childrenInputCoords.x, childrenInputCoords.y);
          console.log("\n");
          // });
        }
      }
    },
  },

  computed: {
    isGettedAllCoords() {
      // console.log("isGettedAllCoords", this.isGettedAllCoords);
      return (
        this.selfOutputCoords !== null && this.childrenInputCoords !== null
      );
    },
  },

  watch: {
    isGettedAllCoords() {
      // console.log("isGettedAllCoords");
      this.selfOutputCoords.forEach((selfOutputCoords, idx) => {
        this.drawLine(selfOutputCoords, this.childrenInputCoords[idx]);
      });
      // if (this.isGettedAllCoords) {
      //   this.drawLine(this.selfOutputCoords, this.childrenInputCoords);
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
canvas {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  // background-color: green;
  z-index: 10;
}

.branch {
  display: flex;
  // position: relative;
  flex-direction: row;
  align-items: center;
  width: fit-content;

  & > *:not(canvas) {
    margin: 20px;
  }

  & > canvas {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    // background-color: green;
    // width: 100%;
    // height: 100%;
    z-index: 10;
  }
}
</style>
