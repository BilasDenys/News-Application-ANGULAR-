import { INewsStore } from '../feature/store/News/reducer';

export interface IAppStore {
  news: INewsStore
}