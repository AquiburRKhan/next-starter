import { init, RematchRootState, RematchStore } from '@rematch/core';
import createRematchPersist from '@rematch/persist';
import * as models from './models'

let reduxStore: RematchStore;

const persistPlugin = createRematchPersist({
  whitelist: ['counter','user'],
  version: 1
});

export const initializeStore = (initialState = {}) => {
  reduxStore = init({
    models,
    plugins: [persistPlugin]
  });

  return reduxStore;
}

export type RootStore = typeof reduxStore;
export type RootDispatch = typeof reduxStore.dispatch;
export type iRootState = RematchRootState<typeof models>;