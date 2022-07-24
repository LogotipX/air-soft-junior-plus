<template>
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
            @getAllCoords="mergeAllCoords"
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

  emits: ["kikUpChildrenInputCoords", "getAllCoords"],

  data() {
    return {
      selfOutputCoords: null, //[{}],
      selfInputCoords: null, // {},
      childrenInputCoords: [], //[{}],
      allCoords: [], //[{}],
    };
  },

  methods: {
    mergeAllCoords(gettedAllCoords) {
      // console.log(
      //   "merge",
      //   this.node.title,
      //   this.allCoords.length,
      //   gettedAllCoords.length
      // );

      // this.allCoords = [
      //   {
      //     selfOutputCoords: this.selfOutputCoords,
      //     childrenInputCoords: this.childrenInputCoords,
      //   },
      //   ...gettedAllCoords,
      // ];

      this.$emit("getAllCoords", gettedAllCoords);
    },

    getSelfOutputCoords(coords) {
      this.selfOutputCoords = coords;
    },

    getSelfInputCoords(coords) {
      this.selfInputCoords = coords;
      this.$emit("kikUpChildrenInputCoords", this.selfInputCoords);
    },

    getChildrenInputCoords(coords) {
      this.childrenInputCoords.push(coords);
    },
  },

  computed: {
    isGettedAllCoords() {
      return (
        this.selfOutputCoords !== null && this.childrenInputCoords !== null
      );
    },
  },

  watch: {
    isGettedAllCoords() {
      // this.selfOutputCoords.forEach((selfOutputCoords, idx) => {
      //   this.drawLine(selfOutputCoords, this.childrenInputCoords[idx]);
      // });
      // this.allCoords.push({
      //   selfOutputCoords: this.selfOutputCoords,
      //   childrenInputCoords: this.childrenInputCoords,
      // });
      // this.$emit("getAllCoords", this.allCoords);
      this.$emit("getAllCoords", {
        selfOutputCoords: this.selfOutputCoords,
        childrenInputCoords: this.childrenInputCoords,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// canvas {
//   display: block;
//   position: absolute;
//   top: 0;
//   left: 0;
//   // background-color: green;
//   z-index: 10;
// }

.branch {
  display: flex;
  // position: relative;
  flex-direction: row;
  align-items: center;
  width: fit-content;

  & > * {
    margin: 20px;
  }

  .left-node-block {
    margin-right: 75px;
  }

  .right-node-block {
    margin-left: 75px;
  }
}
</style>
