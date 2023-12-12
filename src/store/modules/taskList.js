export default {
  namespaced: true,

  state: () => ({
    tasks: [],
  }),
  getters: {},
  mutations: {
    removeTaskListData(state) {
      state.tasks = [];
    },
    setTaskListData(state, payload) {
      state.tasks = payload;
    },
    setTaskPageSize(state, payload) {
      state.page_size = payload;
    },
    addTask(state, payload) {
      state.tasks = [...state.tasks, payload];
    },
    updateTask(state, payload) {
      const { id } = payload;
      state.tasks = state.tasks.map(task =>
          task.id === id
          ? payload
          : task
      );
    },
    removeTask(state, payload) {
      state.tasks = state.tasks.filter(task => task.id !== payload);
    },
  },
};
