import React = require("react");
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { TrendingDown, TrendingUp, ArrowUp, ArrowDown } from "react-feather";
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import * as Model from "../models";

interface State {
    stocks: Model.Stock[];
    priceHighlight: boolean,
};

interface Props {
  stocks: Model.Stock[];
  priceHighlight: boolean; 
}

class StockTable extends React.Component<any, State> {
  state: State = {
    stocks: [],
    priceHighlight: true
  };

  constructor(props: Props) {
    super(props)
    this.state = {
      stocks: props.stocks || [],
      priceHighlight: props.priceHighlight || true,
    }
    this.dateFormatter = this.dateFormatter.bind(this);
    this.priceFormatter = this.priceFormatter.bind(this);
  }

  dateFormatter (cell: Date, row: any) {
    var d = cell;          
    var n = d.toLocaleString([], { hour12: true});
    return n;
  }

  priceFormatter (cell: Number, row: any) {
    if(!this.props.priceHighlight) {
      return (<div style={{color: 'green'}}>  {cell} </div>)
    }
    if(row.isProfit === true) {
      return (<div style={{color: 'green'}}>  {cell} <ArrowUp /> </div>)
    } else {
      return (<div style={{color: 'red'}}>  {cell} <ArrowDown /> </div>)
    }
  }
  render() {
   

    return (
      <div style={{height: "fit-content"}}>
        <BootstrapTable {...this.props.btOptions}>
          <TableHeaderColumn dataField='id' isKey filter={ { type: 'TextFilter', delay: 1000 } }>Id</TableHeaderColumn>
          <TableHeaderColumn dataField='symbol' filter={ { type: 'TextFilter', delay: 1000 } }>Symbol</TableHeaderColumn>
          <TableHeaderColumn dataField='name' filter={ { type: 'TextFilter', delay: 1000 } }>Name</TableHeaderColumn>
          <TableHeaderColumn dataField='price' dataFormat={ this.priceFormatter }>Price</TableHeaderColumn>
          <TableHeaderColumn dataField='date'   dataFormat={ this.dateFormatter }  filter={ { type: 'DateFilter', delay: 1000 } }>Date</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default StockTable;



