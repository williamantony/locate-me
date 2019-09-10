import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HeaderConnectionsCount.css';

class HeaderConnectionsCount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const count = Object.keys(props.connections).length;
    if (count !== state.count)
      return {
        count: count - 1 || 0,
      };
    return null;
  }

  render() {
    return (
      <div className="HeaderConnectionsCount HeaderConnectionsCount--outlined">
        <div className="HeaderConnectionsCount__block">
          <div className="HeaderConnectionsCount__icon"></div>
          <div className="HeaderConnectionsCount__text">{ this.state.count }</div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    connections: state.connections,
  };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderConnectionsCount);
