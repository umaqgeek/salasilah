import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Table from './Table';
import LoadingBadge from './LoadingBadge';
import ModalBox from './ModalBox';
import { getSqlErrors } from '../utilities/Errors';

class ManageListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataServer: {
        columns: [],
        data: [],
      },
      loadingText: '',
      loadingStatus: false,
      boxModal: {
        isModal: false,
        message: '',
        color: ''
      },
      excludeColumns: this.props.excludeColumns || [],
      extraButtons: this.props.extraButtons || [],
    };
    this.listData = this.listData.bind(this);
  };

  componentDidMount() {
    this.listData();
  };

  listData() {
    this.setState({
      ...this.state,
      loadingText: 'Loading ...',
      loadingStatus: true,
    });
    var self = this;
    const token = localStorage.getItem('authToken');
    const bearerToken = `Bearer ${token}`;
    axios.get('/api/'+this.props.apiListAll, {
      headers: {
        'Authorization': bearerToken,
      }
    })
    .then(response => {
      var cols = response.data.columns;
      self.state.excludeColumns.forEach(function(exCol) {
        var index = cols.findIndex(function(col) {
          return col.toLowerCase().includes(exCol);
        });
        if (index != -1) {
          cols.splice(index, 1);
        }
      });
      cols.push('Action');
      var rows = response.data.data;
      rows = rows.map(function(row) {
        for (var key in row) {
          if (self.state.excludeColumns.includes(key)) {
            delete row[key];
          }
        }

        let extraButtons = (<span className='mr-2'></span>)
        if (self.state.extraButtons.length > 0) {
          extraButtons = self.state.extraButtons.map(function (u) {
            return (
              <span key={u.url}>
                <span className='mr-2'></span>
                <Link to={u.url+row.id}>
                  {u.ui}
                </Link>
              </span>
            );
          });
        }

        row.action = (
          <span>
            <Link to={window.location.pathname+'/edit/'+row.id}>
              <button type='button' className='btn btn-primary'><FontAwesomeIcon icon="edit" /></button>
            </Link>
            <span className='mr-2'></span>
            <Link to={window.location.pathname+'/delete/'+row.id}>
              <button type='button' className='btn btn-danger'><FontAwesomeIcon icon="trash-alt" /></button>
            </Link>
            {extraButtons}
          </span>
        );
        return row;
      });
      self.setState({
        ...self.state,
        dataServer: {
          columns: cols,
          data: rows,
        },
        loadingText: '',
        loadingStatus: false,
      });
    })
    .catch(error => {
      self.setState({
        ...self.state,
        boxModal: {
          isModal: true,
          message: getSqlErrors(error.response.data.error),
          color: 'red'
        },
        loadingText: '',
        loadingStatus: false,
      });
    });
  };

  render() {

    let onCloseModal = () => {
      this.setState({
        ...this.state,
        boxModal: {
          isModal: false,
          message: '',
          color: ''
        }
      });
    };

    let showTable = (this.state.loadingText);
    if (!this.state.loadingStatus) {
      showTable = (
        <Table
          titleName={this.props.titleName}
          tableName={this.props.tableName}
          cols={this.state.dataServer.columns}
          rows={this.state.dataServer.data}
        />
      );
    }

    let showRefresh = (<span></span>);
    if (!this.state.loadingStatus) {
      showRefresh = (<button type='button' className='btn' onClick={this.listData}><FontAwesomeIcon icon="sync-alt" />&nbsp; Refresh</button>);
    }

    return (
      <div className='container1'>
        <br />
        <div className='col-md-12 card card-body'>
          <center>

            <ModalBox
              open={this.state.boxModal.isModal}
              message={this.state.boxModal.message}
              color={this.state.boxModal.color}
              onCloseModal={onCloseModal}
            />

            <h3>Manage {this.props.titleName}</h3>
            <hr />
          </center>

          <div className='row'>
            <div className='col-md-3'>
              <Link to={this.props.backUrl}>
                <button type='button' className='btn btn-dark'><FontAwesomeIcon icon="chevron-circle-left" />&nbsp; Back</button>
              </Link>
              <span className='mr-2'></span>
              {showRefresh}
            </div>
          </div>

          <div className='row'>
            <div className='col-md-12'>

              {showTable}

            </div>
          </div>

        </div>
      </div>
    );
  }
};

export default ManageListComponent;
