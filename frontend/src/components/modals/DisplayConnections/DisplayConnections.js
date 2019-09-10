import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getConnections } from '../../../redux/actions';
import './DisplayConnections.css';
import ModalTitle from '../../ModalTitle/ModalTitle';
import Connections from '../../Connections/Connections';

class DisplayConnections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connections: [],
    };
    props.getConnections();
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="DisplayConnections">
        <ModalTitle text="Connections" align="left" />
        <Connections />
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  getConnections,
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayConnections);
