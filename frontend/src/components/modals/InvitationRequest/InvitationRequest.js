import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setBeaconUser } from '../../../redux/actions';
import ModalTitle from '../../ModalTitle/ModalTitle';
import ContentWrapper from '../../ContentWrapper/ContentWrapper';
import ParagraphText from '../../ParagraphText/ParagraphText';
import ButtonsGroup from '../../ButtonsGroup/ButtonsGroup';
import Button from '../../Button/Button';

class InvitationRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inviteCode: props.inviteCode,
    };
  }

  handleAccept = e => {
    e.preventDefault();
    const { inviteCode } = this.state;
    this.props.setBeaconUser(inviteCode);
  }

  render() {
    return (
      <div className="InvitationRequest">
        <ModalTitle text="Location Request" align="left" />
        <ContentWrapper>

          <ParagraphText style={{ padding: '25px 0px' }}>
            Someone is requesting your current location.
          </ParagraphText>

          <ButtonsGroup style={{ marginTop: '50px' }}>
            <Button text="Accept" color="green" theme="filled" onClick={this.handleAccept} />
            <Button text="Ignore" color="red" theme="lite" />
          </ButtonsGroup>

        </ContentWrapper>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  setBeaconUser,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InvitationRequest));
