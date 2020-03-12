import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class One extends Component {
  constructor() {
    super();
    this.state = {
      one: 'one',
    };
  }

  render() {
    const { one } = this.state;
    return <div>{one}</div>;
  }
}

ReactDOM.render(<One />, document.getElementById('root'));
