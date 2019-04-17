/* eslint-disable func-names */
import React from 'react';
import $ from 'jquery';
import Search from './Search.jsx';
import Result from './Result.jsx';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '2019-01-28',
      totalItems: '0',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDataSubmission = this.handleDataSubmission.bind(this);
  }

  componentDidMount() {
    let {date} = this.state;
    $.ajax({
      url: '/getInventory',
      type: 'GET',
      data: date,
      contentType: 'application/json'
    })
      .done((data) => {
        this.setState({totalItems: data});
      })
      .fail((error) => {
        console.log(error.status);
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleDataSubmission(inputData) {
    event.preventDefault();
    $.ajax({
      url: '/getInventory',
      type: 'GET',
      data: inputData,
      contentType: 'application/json'
    })
    .done((data) => {
      this.setState({totalItems: data});
    })
    .fail((error) => {
      console.log(error.status);
    });
  }

  render() {
    return (
      <div id='app'>
        <h1 id='title'>Spring Foods</h1>
        <div>
          <Search date={this.state.date} handleChange={this.handleChange} handleDataSubmission={this.handleDataSubmission} />
        </div>
        <div>
          <Result totalItems={this.state.totalItems} date={this.state.date} />
        </div>
      </div>
    );
  }
}

export default App;
