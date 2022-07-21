<template>
  <div class="branch">
    <div class="input-node-block">
      <node-block
        :title="node.title"
        :isFirstNode="isFirstNode"
        :nodes="node.nodes"
      />
    </div>
    <ul class="output-node-blocks">
      <template v-if="node.nodes">
        <li
          v-for="(nodeItem, idx) in node.nodes"
          :key="nodeItem + idx"
          class="node-branch"
        >
          <branches-container :node="nodeItem" />
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
      default: false,
    },
  },
  data() {
    return {};
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
}
</style>
