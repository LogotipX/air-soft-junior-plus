<template>
  <div class="node">
    <div class="node__header">
      <div class="header__text">
        <span>{{ title }}</span>
      </div>
    </div>
    <div class="node__container">
      <div class="container__in">
        <div v-if="!isFirstNode" class="node__point">
          <span ref="inputPoint">
            <node-point />
          </span>
          <div class="node__text">in</div>
        </div>
      </div>
      <div class="container__out">
        <div
          v-for="(nodePoint, idx) of nodes"
          :key="nodePoint"
          class="node__point"
        >
          <div class="node__text">out</div>
          <span :ref="'outputPoint' + idx">
            <node-point />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NodePoint from "./NodePoint.vue";

export default {
  name: "NodeBlock",
  components: { NodePoint },
  props: {
    title: {
      type: String,
      require: true,
    },
    isFirstNode: {
      type: Boolean,
      require: false,
      default: false,
    },
    nodes: {
      type: Array,
      require: false,
    },
  },

  emits: ["kickUpSelfOutputCoords", "kickUpSelfInputCoords"],

  data() {
    return {
      outputCoords: [],
      inputCoords: {},
    };
  },

  mounted() {
    this.getPointsCoords();
    // this.$emit("getPointsCoords", this.coords);
    this.$emit("kickUpSelfOutputCoords", this.outputCoords);
    this.$emit("kickUpSelfInputCoords", this.inputCoords);
  },

  methods: {
    getPointsCoords() {
      this.getOutputPointCoords();
      this.getInputPointCoords();
    },

    getInputPointCoords() {
      const inputPoint = this.$refs.inputPoint;
      this.inputCoords = inputPoint?.getBoundingClientRect();
      // console.log("input", this.title, this.inputCoords);
    },

    getOutputPointCoords() {
      if (this.nodes !== null) {
        this.nodes.forEach((node, idx) => {
          const outputPoint = this.$refs?.["outputPoint" + idx][0];
          this.outputCoords.push(outputPoint.getBoundingClientRect());
          // console.log("output", this.title, this.outputCoords[idx]);
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$header-height: 45px;
$node-items-padding: 20px;

.node {
  display: block;
  width: 250px;
  // height: 129px;
  min-height: 129px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  overflow: hidden;

  .node__header {
    display: flex;
    position: relative;
    align-items: center;
    padding: $node-items-padding;
    width: 250px;
    height: $header-height;
    background-color: #7555f6;

    .header__text {
      display: inline;
      color: #fff;
      font-size: 16px;
      font-weight: 600;
      vertical-align: baseline;

      & > * {
        vertical-align: sub;
        vertical-align: -moz-middle-with-baseline;
      }
    }
  }

  .node__container {
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    padding: $node-items-padding;
    width: 100%;
    min-height: calc(129px - $header-height);

    .node__text {
      display: inline;
      font-size: 16px;
      color: #000;
      line-height: 16.8px;
      margin: 0 10px;
    }
  }
}
</style>
