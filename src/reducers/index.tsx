import { combineReducers, createStore } from "redux";
import { StockController, TrendingStockController} from "./stockController";
import { composeWithDevTools } from 'redux-devtools-extension';
import * as Model from "../models";

export type ReduxType = {
  stocks: Model.Stock[];
  trendingStocks: Model.Stock[];
};

type SyncReduxType = {
  [P in keyof ReduxType]: (
    state: Pick<ReduxType, P> | any,
    action: any
  ) => Pick<ReduxType, P> | any;
};

const reduxObj: SyncReduxType = {
  stocks: StockController.reducer,
  trendingStocks: TrendingStockController.reducer
};

const reducer = combineReducers(reduxObj);

export const appStore = createStore(reducer, composeWithDevTools());
