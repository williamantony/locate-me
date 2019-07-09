import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.css';

class Header extends Component {

  render() {
    return (
      <div className="Header">
        <div className="wrapper">
          
          <div className="Header__bar">
            <div className="Header__menu"></div>
            <div className="Header__logo"></div>
          </div>

        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
