<template>
  <div class="nodes__container">
    <div v-for="node in nodesArr" :key="node" class="branch">
      <branches-container :node="node" :isFirstNode="true" />
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
    this.getNodesArr();
  },

  methods: {
    async getNodesArr() {
      this.nodesArr = await getNodes();
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
  align-items: center;
}
</style>
