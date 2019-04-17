import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <form onSubmit={() => this.props.handleDataSubmission(this.props.date)}>
          <div>
            <label>Choose Expiration Date: (yyyy-mm-dd)</label>
            <br />
            <input type="text" id="date" name="date" required value={this.props.date} onChange={(event) => this.props.handleChange(event)} />
          </div>
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

export default Search;
