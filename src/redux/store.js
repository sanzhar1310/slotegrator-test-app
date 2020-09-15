import { useMemo } from 'react';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { userReducer } from '../reducers/userReducer';

let store;

const rootReducer = combineReducers({
  user: userReducer,
});

function initStore(initialState) {
  return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
}

export const initializeStore = (preloadedState) => {
  let hydratedStore = store ?? initStore(preloadedState);

  if (preloadedState && store) {
    hydratedStore = initStore({
      ...store.getState(),
      ...preloadedState,
    });

    store = undefined;
  }

  if (typeof window === 'undefined') {
    return hydratedStore;
  }

  if (!store) {
    store = hydratedStore;
  }

  return hydratedStore;
};

export const useStore = (initialStore) => {
  const reduxStore = useMemo(() => initializeStore(initialStore), [initialStore]);
  return reduxStore;
};
