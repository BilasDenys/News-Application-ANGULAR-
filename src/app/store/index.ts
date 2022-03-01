import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import * as fromNewsStore from '../feature/store/News/reducer';

export interface IAppStore {
  news: fromNewsStore.INewsStore;
}

const reducers: ActionReducerMap<any, any> = { news: fromNewsStore.reducer };

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['news'], rehydrate: true })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
