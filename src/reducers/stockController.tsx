import * as Model from "../models";

export const StockActionTypes = {
  Set: "Set_Stock",
};

export const TrendingStockActionTypes = {
  Set: "Set_Trending_Stock",
};

const rendomNumber = (start: number, end: number) => Math.floor((Math.random() * end) + start)

const getStocksValue = (n: number) => {
  const stocks: Model.Stock[] = [];
  let date;
  for (let i = 1; i <= n; i++) {
    const isProfit = rendomNumber(0, 2) ? true : false;
    if (date) {
      date = new Date(date.getTime() + 60000 * 180)
    } else {
      date =  new Date();
    }
    const stock: Model.Stock =  {
      id: i,
      name: `stock${i}`,
      price: rendomNumber(1000, 500000),
      date: date,
      symbol: `symbol-${i}`,
      isProfit
    };
    stocks.push(stock);
  }
  return stocks;
}

const getTrendingStocksValue = (stocks: Model.Stock[]) => {
  let date;
  const TrendingStocks: Model.Stock[] = [];
  let count = 0;
  for (let i = 0; i <= stocks.length; i++) {
    const stock: Model.Stock = stocks[i];
    if(count >= 5) {
      break;
    }
    if (stock.isProfit) {
      TrendingStocks.push(stock);
      count++;
    }
  }
  return TrendingStocks;
}


export class StockController {

  static value: Model.Stock[] = getStocksValue(20)

  static reducer(state = StockController.value, action: any) {
    if (action && action.type === StockActionTypes.Set) {
      state = {
        ...state,
      };
    }
    return state;
  }

  static setStockData(data: Model.Stock[]) {
    return {
      type: StockActionTypes.Set,
      data,
    };
  }
}

export class TrendingStockController {

  static value: Model.Stock[] = getTrendingStocksValue(StockController.value)

  static reducer(state = TrendingStockController.value, action: any) {
    if (action && action.type === TrendingStockActionTypes.Set) {
      state = {
        ...state,
      };
    }
    return state;
  }

  static setStockData(data: Model.Stock[]) {
    return {
      type: TrendingStockActionTypes.Set,
      data,
    };
  }
}

