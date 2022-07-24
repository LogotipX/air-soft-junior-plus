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
      nodesArr: [
        {
          nodes: [
            {
              nodes: [
                {
                  nodes: [
                    {
                      nodes: [
                        {
                          nodes: [
                            {
                              nodes: [
                                {
                                  nodes: [
                                    {
                                      nodes: null,
                                      title: "5 Node 1.1.1.1.1.1",
                                    },
                                  ],
                                  title: "4 Node 1.1.1.1.1",
                                },
                                {
                                  nodes: [
                                    {
                                      nodes: null,
                                      title: "5 Node 1.1.1.1.2.1",
                                    },
                                  ],
                                  title: "4 Node 1.1.1.1.2",
                                },
                              ],
                              title: "5 Node 1.1.1.1.1.1",
                            },
                          ],
                          title: "4 Node 1.1.1.1.1",
                        },
                        {
                          nodes: [
                            {
                              nodes: [
                                {
                                  nodes: [
                                    {
                                      nodes: [
                                        {
                                          nodes: null,
                                          title: "5 Node 1.1.1.1.2.1",
                                        },
                                      ],
                                      title: "4 Node 1.1.1.1.2",
                                    },
                                  ],
                                  title: "5 Node 1.1.1.1.1.1",
                                },
                              ],
                              title: "5 Node 1.1.1.1.2.1",
                            },
                          ],
                          title: "4 Node 1.1.1.1.2",
                        },
                      ],
                      title: "3 Node 1.1.1.1",
                    },
                  ],
                  title: "2 Node 1.1.1",
                },
              ],
              title: "1 Node 1.1",
            },
            {
              nodes: [
                {
                  nodes: [
                    {
                      nodes: [
                        {
                          nodes: [{ nodes: null, title: "5 Node 1.2.1.1.1.2" }],
                          title: "4 Node 1.2.1.1.1",
                        },
                      ],
                      title: "3 Node 1.2.1.1",
                    },
                  ],
                  title: "2 Node 1.2.1",
                },
              ],
              title: "1 Node 1.2",
            },
          ],
          title: "0 Node 1",
        },
        {
          nodes: [
            {
              nodes: [
                {
                  nodes: [
                    {
                      nodes: [
                        {
                          nodes: [{ nodes: null, title: "5 Node 1.1.1.1.1.1" }],
                          title: "4 Node 1.1.1.1.1",
                        },
                        {
                          nodes: [
                            {
                              nodes: [
                                {
                                  nodes: [
                                    {
                                      nodes: [
                                        {
                                          nodes: [
                                            {
                                              nodes: null,
                                              title: "5 Node 1.1.1.1.1.1",
                                            },
                                          ],
                                          title: "4 Node 1.1.1.1.1",
                                        },
                                        {
                                          nodes: [
                                            {
                                              nodes: null,
                                              title: "5 Node 1.1.1.1.2.1",
                                            },
                                          ],
                                          title: "4 Node 1.1.1.1.2",
                                        },
                                      ],
                                      title: "5 Node 1.1.1.1.1.1",
                                    },
                                  ],
                                  title: "4 Node 1.1.1.1.1",
                                },
                                {
                                  nodes: [
                                    {
                                      nodes: [
                                        {
                                          nodes: [
                                            {
                                              nodes: null,
                                              title: "5 Node 1.1.1.1.1.1",
                                            },
                                          ],
                                          title: "4 Node 1.1.1.1.1",
                                        },
                                        {
                                          nodes: [
                                            {
                                              nodes: null,
                                              title: "5 Node 1.1.1.1.2.1",
                                            },
                                          ],
                                          title: "4 Node 1.1.1.1.2",
                                        },
                                      ],
                                      title: "5 Node 1.1.1.1.2.1",
                                    },
                                  ],
                                  title: "4 Node 1.1.1.1.2",
                                },
                              ],
                              title: "5 Node 1.1.1.1.2.1",
                            },
                          ],
                          title: "4 Node 1.1.1.1.2",
                        },
                      ],
                      title: "3 Node 1.1.1.1",
                    },
                  ],
                  title: "2 Node 1.1.1",
                },
              ],
              title: "1 Node 1.1",
            },
            {
              nodes: [
                {
                  nodes: [
                    {
                      nodes: [
                        {
                          nodes: [{ nodes: null, title: "5 Node 1.2.1.1.2.1" }],
                          title: "4 Node 1.2.1.1.2",
                        },
                        {
                          nodes: [{ nodes: null, title: "5 Node 1.2.1.1.1.2" }],
                          title: "4 Node 1.2.1.1.1",
                        },
                      ],
                      title: "3 Node 1.2.1.1",
                    },
                  ],
                  title: "2 Node 1.2.1",
                },
              ],
              title: "1 Node 1.2",
            },
          ],
          title: "0 Node 1",
        },
      ],
    };
  },

  created() {
    // this.getNodesArr();
  },

  methods: {
    async getNodesArr() {
      this.nodesArr = await getNodes();
    },

    constructGraphic({ selfOutputCoords, childrenInputCoords }) {
      // this.$nextTick(() => {
      this.nodesContainerWidth = this.$refs.nodesContainer.clientWidth;
      this.nodesContainerHeight = this.$refs.nodesContainer.clientHeight;
      console.log(this.nodesContainerWidth, this.nodesContainerHeight);
      // });

      this.$nextTick(() => {
        for (let i = 0; i < selfOutputCoords.length; i++) {
          // console.log(selfOutputCoords[i], childrenInputCoords[i]);

          this.drawLines(selfOutputCoords[i], childrenInputCoords[i]);
        }
      });
    },

    drawLines(selfOutputCoords, childrenInputCoords) {
      console.log("drawLine");
      // console.log("selfOutputCoords", selfOutputCoords);
      // console.log("childrenInputCords", childrenInputCoords);

      const drawingLine = document.getElementById("node-tree-branches");
      if (drawingLine && drawingLine.getContext) {
        const context = drawingLine.getContext("2d");

        if (selfOutputCoords) {
          // console.log("outputForEach", selfOutputCoords);
          // selfOutputCoords.forEach((outputPoint) => {
          context.lineWidth = 2;
          context.strokeStyle = "#7555f6";
          context.beginPath();
          context.moveTo(selfOutputCoords.x + 10, selfOutputCoords.y + 7);
          context.lineTo(childrenInputCoords.x + 1, childrenInputCoords.y + 7);
          // context.moveTo(50, 50);
          // context.lineTo(0, 0);
          context.closePath();
          context.stroke();

          // console.log(this.node.title);
          // console.log("output", selfOutputCoords.x, selfOutputCoords.y);
          // console.log("input", childrenInputCoords.x, childrenInputCoords.y);
          // console.log("\n");
          // });
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
  width: fit-content;
  align-items: center;
}

canvas {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  // background-color: green;
  z-index: 10;
}
</style>
