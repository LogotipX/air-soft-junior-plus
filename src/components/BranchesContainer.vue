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
            @getAllCoords="bubbleUpAllCoords"
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
    bubbleUpAllCoords(gettedAllCoords) {
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
      this.$emit("getAllCoords", {
        selfOutputCoords: this.selfOutputCoords,
        childrenInputCoords: this.childrenInputCoords,
      });
    },
  },
};
</script>

<style lang="scss" scoped>

.branch {
  display: flex;
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
