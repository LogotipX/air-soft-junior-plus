<template>
  <div class="node">
    <div class="node__header">
      <div class="header__text">
        <span>Node {{ count }}</span>
      </div>
    </div>
    <div class="node__container">
      <div class="container__in">
        <div v-if="typeof node__in === 'number'" class="node__point">
          {{ node__in }}
          <div class="node__text">in</div>
        </div>
      </div>
      <div class="container__out">
        <div class="node__point">
          <div v-if="typeof node__out === 'number'" class="node__text">out</div>
          {{ node__out }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Node",
  props: {
    count: Number,
    node__in: Number,
    node__out: Number,
  },

  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
$header-height: 45px;
$node-items-padding: 0 20px;

.node {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 129px;
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
    height: calc(100% - $header-height);

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
