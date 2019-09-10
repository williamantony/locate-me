import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createModal } from '../../redux/actions';
import InvitationRequest from '../modals/InvitationRequest/InvitationRequest';

class Invitation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalId: 'AcceptInvitationModal',
      inviteCode: props.match.params.code || null,
    };
  }

  componentDidMount() {
    this.props.createModal(
      this.state.modalId, 
      <InvitationRequest inviteCode={this.state.inviteCode} />,
      true,
    );
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  createModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Invitation);
