/* eslint-disable react/prefer-stateless-function */
const React = require('react');
const style = require('./style.css');

class Index extends React.Component {
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

module.exports = <Index />;
