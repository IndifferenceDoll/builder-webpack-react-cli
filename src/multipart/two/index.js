import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Two extends Component {
  constructor() {
    super();
    this.state = {
      two: 'two',
    };
  }

  render() {
    const { two } = this.state;
    return <div>{two}</div>;
  }
}

ReactDOM.render(<Two />, document.getElementById('root'));
