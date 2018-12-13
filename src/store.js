import { Iterable } from "immutable";
import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import reducer from "./reducer";
import fetchJokesWatcher from "./saga";

const loggerMiddleware = createLogger({
  stateTransformer: state => {
    if (Iterable.isIterable(state)) return state.toJS();
    return state;
  }
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  compose(applyMiddleware(sagaMiddleware, loggerMiddleware))
);

sagaMiddleware.run(fetchJokesWatcher);

export default store;
