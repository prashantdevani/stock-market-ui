import React = require("react");
import "./index.scss";
import { hot } from "react-hot-loader/root";
import { connect, Provider } from "react-redux";
import { appStore, ReduxType } from "../reducers";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import StockTable from "../components/stockTable";
export type AppState = {};

class App extends React.Component<any, AppState> {

  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <>
        <h1> Trending Stocks </h1>
        <StockTable btOptions = {{
          data:this.props.trendingStocks,
          striped:true,
        }} priceHighlight ={true}/>
        <br/>
        <h1> Stocks </h1>
        <StockTable btOptions = {{
          data:this.props.stocks,
          striped:true,
          hover:true,
          condensed:true,
          pagination:true,
        }} priceHighlight ={true} />
      </>
    );
  }
}

const mapStateToProps = (state: ReduxType) => {
  return {
    stocks: state.stocks,
    trendingStocks: state.trendingStocks,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    reduxDispatch: dispatch,
  };
};

const MainApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default hot(() => {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Route path="/" component={MainApp} />
      </BrowserRouter>
    </Provider>
  );
});
