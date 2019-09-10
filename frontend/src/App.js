import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createModal } from './redux/actions';
import './App.css';
import UserIdentifier from './components/UserIdentifier/UserIdentifier';
import Header from './components/Header/Header';
import Modal from './components/Modal/Modal';
// Route Components
import GPSReceiver from './components/GPSReceiver/GPSReceiver';
import Invitation from './components/Invitation/Invitation';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBackgroundBlurred: props.isBackgroundBlurred,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isBackgroundBlurred !== state.isBackgroundBlurred) {
      return {
        isBackgroundBlurred: props.isBackgroundBlurred,
      };
    }
    return null;
  }

  render() {
    return (
      <div className="App">
        <UserIdentifier />
        <div className="AppContent" data-isblurred={this.state.isBackgroundBlurred}>
          <Header />
          <Switch>
            <Route exact path="/" component={GPSReceiver} />
            <Route path="/:code" component={Invitation} />
          </Switch>
        </div>
        <Modal />
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    isBackgroundBlurred: state.theme.isBackgroundBlurred,
  };
};

const mapDispatchToProps = {
  createModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
