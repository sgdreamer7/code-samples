const RESET = 'store/RESET';

const modulesContext = require.context('./', false, /^((?!index).)*\.js$/);
const getDefaultState = () => modulesContext.keys().reduce((modules, key) => {
  if (!modulesContext(key).default.defaultState) return modules;

  modules[key.replace(/(^\.\/)|(\.js$)/g, '')] = modulesContext(key).default.defaultState();

  return modules;
}, {});

export default {
  state: modulesContext.keys().reduce((modules, key) => {
    modules[key.replace(/(^\.\/)|(\.js$)/g, '')] = modulesContext(key).default.state;

    return modules;
  }, {}),

  mutations: Object.assign({
    [RESET] (state) {
      const defaultState = getDefaultState();
      Object.keys(defaultState).forEach(key => { state[key] = defaultState[key]; });
    },
  }, modulesContext.keys().reduce((modules, key) => {
    modules = Object.assign(modules, modulesContext(key).default.mutations);

    return modules;
  }, {})),

  resetState: ({ dispatch }) => {
    dispatch(RESET);
  },
};
