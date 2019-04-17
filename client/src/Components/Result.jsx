import React from 'react';

class Result extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        As of {this.props.date}, there are total of <strong>{this.props.totalItems}</strong> fresh items in-stock
      </div>
    );
  }
}

export default Result;
