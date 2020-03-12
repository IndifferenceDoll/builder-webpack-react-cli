import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import style from './style.css';

class Index extends Component {
  constructor() {
    super();
    this.state = {
      index: 'index',
    };
  }

  render() {
    const { index } = this.state;
    return <div className={style.index}>{index}</div>;
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
