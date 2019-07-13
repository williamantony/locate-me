import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import GPSReceiver from './components/GPSReceiver/GPSReceiver';
import GPSSender from './components/GPSSender/GPSSender';
import LocationSharing from './components/LocationSharing/LocationSharing';
import LocationReinstateForm from './components/LocationReinstateForm/LocationReinstateForm';
import UserIdentifier from './components/UserIdentifier/UserIdentifier';

function App() {
  return (
    <div className="App">
      <Header />
      <UserIdentifier />
      <Switch>
        <Route exact path="/" component={GPSReceiver} />
        <Route exact path="/request" component={GPSSender} />
        <Route exact path="/sharing/active" component={LocationSharing} />
        <Route exact path="/sharing/inactive" component={LocationReinstateForm} />
      </Switch>
    </div>
  );
}

export default App;
