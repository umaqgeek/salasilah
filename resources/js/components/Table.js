import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { formatNumber, getCustomDate2 } from '../utilities/Func';

class Table extends Component {
  constructor(props) {
    super(props);

    const maxRows = 5;
    var totalPage = parseInt(this.props.rows.length / maxRows);
    totalPage = this.props.rows.length % maxRows != 0 ? totalPage + 1 : totalPage;
    totalPage = this.props.rows.length <= 0 ? 1 : totalPage;
    this.state = {
      dataServer: {
        columns: this.props.cols,
        columnsView: null,
        rows: this.props.rows,
        rowsView: null,
        maxRowsFlag: maxRows,
        maxRows: maxRows, // (maxRows, 2maxRows, 3maxRows)
        startRow: 0, // (0, maxRows, 2maxRows)
        page: 1, // (1, 2, 3)
        totalPage: totalPage,
        searchText: '',
      },
    };

    this.getRows = this.getRows.bind(this);
    this.setColumnsRows = this.setColumnsRows.bind(this);
    this.onNextPage = this.onNextPage.bind(this);
    this.onBackPage = this.onBackPage.bind(this);
    this.onSearch = this.onSearch.bind(this);

    localStorage.setItem('tableName', this.props.tableName);
    localStorage.setItem('titleName', this.props.titleName);
  };

  componentDidMount() {
    this.setColumnsRows();
  };

  getRows(rows) {
    var self = this;
    const maxStringLength = 20;
    rows = rows.slice(this.state.dataServer.startRow, this.state.dataServer.maxRows);
    const rowLength = rows.length;
    rows = rowLength > 0 ? rows.map(function(row) {
      var cell = Object.entries(row).map(function(r) {
        var key = r[0];
        var value = r[0].toLowerCase().includes('price') ? formatNumber((parseFloat(r[1])).toFixed(2)) : r[1];
        value = typeof r[1] === 'string' ? value.toUpperCase() : value;
        value = typeof r[1] === 'string' && value.length > maxStringLength ? value.substring(0, maxStringLength) + '...' : value;
        value = r[0].toLowerCase().includes('date') ? getCustomDate2(value) : value;
        return (<td key={key}>{value}</td>)
      });
      return (
        <tr key={row.id}>
          {cell}
        </tr>
      );
    }) : (<tr><td colSpan={this.state.dataServer.columns.length}><center><i>- No Data -</i></center></td></tr>);
    return rows;
  };

  setColumnsRows() {
    const cols = this.props.cols.length > 0 ? this.props.cols.map(function(col) {
      col = col.replace('_', ' ');
      col = col.toLowerCase().includes('price') ? col + ' (RM)' : col;
      return (
        <th key={col}>{col.toUpperCase()}</th>
      );
    }) : (<th></th>);

    var self = this;

    var rows = this.getRows(this.props.rows);

    this.setState({
      ...this.state,
      dataServer: {
        ...this.state.dataServer,
        columnsView: cols,
        rowsView: rows,
      }
    });
  };

  onNextPage() {
    var self = this;
    this.setState({
      ...this.state,
      dataServer: {
        ...this.state.dataServer,
        maxRows: this.state.dataServer.maxRows + this.state.dataServer.maxRowsFlag, // (maxRows, 2maxRows, 3maxRows)
        startRow: this.state.dataServer.startRow + this.state.dataServer.maxRowsFlag, // (0, maxRows, 2maxRows)
        page: this.state.dataServer.page + 1, // (1, 2, 3)
      }
    }, () => {
      self.setColumnsRows();
    });
  };

  onBackPage() {
    var self = this;
    this.setState({
      ...this.state,
      dataServer: {
        ...this.state.dataServer,
        maxRows: this.state.dataServer.maxRows - this.state.dataServer.maxRowsFlag, // (maxRows, 2maxRows, 3maxRows)
        startRow: this.state.dataServer.startRow - this.state.dataServer.maxRowsFlag, // (0, maxRows, 2maxRows)
        page: this.state.dataServer.page - 1, // (1, 2, 3)
      }
    }, () => {
      self.setColumnsRows();
    });
  };

  onSearch(obj) {
    const text = obj.target.value;

    var self = this;
    var rows = this.props.rows;
    rows = rows.filter(function (row) {
      var status = false;
      for (var key in row) {
        if (typeof row[key] === 'string' || typeof row[key] === 'number') {
          if (row[key].toString().toLowerCase().includes(text.toLowerCase())) {
            status = true;
            break;
          }
        }
      }
      return status
    });

    rows = this.getRows(rows);

    this.setState({
      ...this.state,
      dataServer: {
        ...this.state.dataServer,
        rowsView: rows,
        searchText: text,
      }
    });
  };

  render() {

    let backPageButton = (<div></div>);
    if (this.state.dataServer.page != 1) {
      backPageButton = (<FontAwesomeIcon icon="chevron-circle-left" style={{cursor: 'pointer'}} onClick={this.onBackPage} />);
    }
    let nextPageButton = (<div></div>);
    if (this.state.dataServer.page != this.state.dataServer.totalPage) {
      nextPageButton = (<FontAwesomeIcon icon="chevron-circle-right" style={{cursor: 'pointer'}} onClick={this.onNextPage} />);
    }

    return (
      <div className='mt-5' style={{maxHeight: 600}}>
        <div className='row'>
          <div className='col-md-9'>
            <Link to={window.location.pathname+'/add'}>
              <button type='button' className='btn btn-primary'><FontAwesomeIcon icon="plus-circle" />&nbsp; Add {this.props.titleName}</button>
            </Link>
          </div>
          <div className='col-md-3'>
            <input
              type='text'
              className='form-control'
              placeholder='Search here'
              value={this.state.dataServer.searchText}
              onChange={this.onSearch}
            />
          </div>
        </div>
        <br />
        <table className='table table-bordered'>
          <thead>
            <tr>
              {this.state.dataServer.columnsView}
            </tr>
          </thead>
          <tbody>
            {this.state.dataServer.rowsView}
          </tbody>
        </table>
        <div>
          <center>
            {backPageButton}
            &nbsp;&nbsp;
            Page {this.state.dataServer.page} of {this.state.dataServer.totalPage}
            &nbsp;&nbsp;
            {nextPageButton}
          </center>
        </div>
      </div>
    );
  }
};

export default Table;
