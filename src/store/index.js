import { Store } from 'vuex';
import authUser from './modules/authUser';
import taskList from './modules/taskList';
import createPersistedState from 'vuex-persistedstate';

export default new Store({
    modules: {
        authUser,
        taskList,
    },
    plugins: [
        createPersistedState(),
    ],
});
