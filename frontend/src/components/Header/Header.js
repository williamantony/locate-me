import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.css';
import HeaderConnectionsCount from '../HeaderConnectionsCount/HeaderConnectionsCount';
import HeaderAddConnectionButton from '../HeaderAddConnectionButton/HeaderAddConnectionButton';

class Header extends Component {

  render() {
    return (
      <div className="Header">
        <div className="wrapper">
          
          <div className="Header__bar">

            <div className="Header__bar__holder">
              <div className="Header__logo">
                <div className="Header__logo__holder">
                  <div className="Header__logo__icon"></div>
                  <div className="Header__logo__text">Locate ME</div>
                </div>
              </div>
              <div className="Header__actions">
                <HeaderConnectionsCount />
                <HeaderAddConnectionButton />
              </div>
            </div>

            <div className="Header__bar__swipehandle">
              <div className="Header__bar__swipehandle__bar"></div>
            </div>

          </div>

        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
