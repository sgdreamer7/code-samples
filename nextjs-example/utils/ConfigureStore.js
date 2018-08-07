import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const env = process.env.NODE_ENV;

export function configureStore(initialState) {
  let middlewares = applyMiddleware(sagaMiddleware);

  if (env !== 'production' && process.browser) {
    middlewares = composeWithDevTools(
      middlewares,
      applyMiddleware(createLogger({ collapsed: true })),
    );
  }

  const store = createStore(
    rootReducer,
    initialState,
    middlewares,
  );

  /**
   * next-redux-saga depends on `runSagaTask` and `sagaTask` being attached to the store.
   *
   *   `runSagaTask` is used to rerun the rootSaga on the client when in sync mode (default)
   *   `sagaTask` is used to await the rootSaga task before sending results to the client
   *
   */
  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };
  store.runSagaTask();
  return store;
}
