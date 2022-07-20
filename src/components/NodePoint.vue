<template>
  <span class="node-point"></span>
</template>

<script>
export default {
  name: "NodePoint",
  date() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.node-point {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #7555f680;
  border: 1px solid #7555f6;
  border-radius: 50%;
}
</style>
