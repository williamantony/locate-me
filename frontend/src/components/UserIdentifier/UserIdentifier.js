import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createModal,
  createClientRequest,
  setClientId,
  setClientInfo,
  setClientName,
  getConnections,
  getBeaconsList,
} from '../../redux/actions';
import UserNameInputModal from '../modals/UserNameInputModal/UserNameInputModal';

class UserIdentifier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: null,
      name: props.name,
    };
    props.getConnections();
    props.getBeaconsList();
  }

  static getDerivedStateFromProps(props, state) {
    const { name } = props;
    if (name !== state.name)
      return { name };
    return null;
  }

  async componentDidMount() {
    // Create and Set Client ID
    const client = await createClientRequest();
    const { clientId } = client;
    this.props.setClientId(client.clientId);
    this.props.setClientInfo(client);
    this.setState({ clientId });
  }

  componentDidUpdate() {
    if (!this.state.name) {

      const modalContent = (
        <UserNameInputModal
          name={this.state.name}
          onClick={this.setClientName}
        />
      );
      this.props.createModal('SetUserNameModal', modalContent, true);

    }
  }

  setClientName = name => {
    this.props.setClientName(name);
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    name: state.self.name || null,
  };
};

const mapDispatchToProps = {
  createModal,
  setClientId,
  setClientInfo,
  setClientName,
  getConnections,
  getBeaconsList,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserIdentifier);
