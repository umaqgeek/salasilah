import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css'

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          data: {
            architect: 0.0,
            developer: 0.0,
            qa: 0.0,
            designer: 0.0,
            sysadmin: 0.0,
          },
          meta: {
            color: 'purple',
          }
        }
      ],
      captions: {
        architect: 'Architect',
        developer: 'Developer',
        qa: 'QA / Tester',
        designer: 'Designer',
        sysadmin: 'System Admin',
      },
    };

    this.onHandler = this.onHandler.bind(this);
  };

  onHandler(obj) {
    var newData = this.state.data.map(function(d) {
      d.data[obj.target.name] = parseFloat(obj.target.value);
      return d;
    });
    this.setState({
      ...this.state,
      data: newData,
    });
  };

  render() {
    return (
      <div className='container'>
        <br />
        <div className='col-md-12 card card-body'>
          <center>

            <h3>Personal Score</h3>
            <hr />

            <select
              name="developer"
              className="form-control"
              onChange={this.onHandler}
              value={this.state.data[0].data.developer}
            >
              <option value={0.0} disabled selected>Know programming?</option>
              <option value={1.0}>Very well</option>
              <option value={0.5}>I may know some</option>
              <option value={0.1}>Nope</option>
            </select>
            <br />

            <select
              name="architect"
              className="form-control"
              onChange={this.onHandler}
              value={this.state.data[0].data.architect}
            >
              <option value={0.0} disabled selected>Know end-to-end journey?</option>
              <option value={1.0}>Very well</option>
              <option value={0.5}>I may know some</option>
              <option value={0.1}>Nope</option>
            </select>
            <br />

            <select
              name="qa"
              className="form-control"
              onChange={this.onHandler}
              value={this.state.data[0].data.qa}
            >
              <option value={0.0} disabled selected>Know functional testing?</option>
              <option value={1.0}>Very well</option>
              <option value={0.5}>I may know some</option>
              <option value={0.1}>Nope</option>
            </select>
            <br />

            <select
              name="designer"
              className="form-control"
              onChange={this.onHandler}
              value={this.state.data[0].data.designer}
            >
              <option value={0.0} disabled selected>Know wireframe and UI/UX?</option>
              <option value={1.0}>Very well</option>
              <option value={0.5}>I may know some</option>
              <option value={0.1}>Nope</option>
            </select>
            <br />

            <select
              name="sysadmin"
              className="form-control"
              onChange={this.onHandler}
              value={this.state.data[0].data.sysadmin}
            >
              <option value={0.0} disabled selected>Know openshift or kubernates?</option>
              <option value={1.0}>Very well</option>
              <option value={0.5}>I may know some</option>
              <option value={0.1}>Nope</option>
            </select>
            <br />

            <RadarChart
              captions={this.state.captions}
              data={this.state.data}
            />

          </center>
        </div>
      </div>
    );
  }
}

export default Dashboard;
