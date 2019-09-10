import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../../redux/actions';
import './LocationPermissionModal.css';
import ModalTitle from '../../ModalTitle/ModalTitle';
import ContentWrapper from '../../ContentWrapper/ContentWrapper';
import ParagraphText from '../../ParagraphText/ParagraphText';
import ButtonsGroup from '../../ButtonsGroup/ButtonsGroup';
import Button from '../../Button/Button';

class LocationPermissionModal extends Component {
  constructor(props) {
    super(props);
    this.acceptPermission = props.acceptPermission;
    this.state = {

    };
  }

  handleClick = e => {
    e.preventDefault();
    global.navigator.geolocation.watchPosition(() => {
      this.acceptPermission();
      this.props.hideModal(this.props.modalId);
    });
  }

  render() {
    return (
      <div className="LocationPermissionModal">
        <ModalTitle text="Permission Required" align="left" />
        <div className="LocationPermissionModal__content">
          <ContentWrapper>

            <ParagraphText style={{ padding: '25px 0px' }}>
              This app is based on Geolocation API, 
              which requires your permission to access your location information.
            </ParagraphText>

            <ButtonsGroup style={{ justifyContent: 'flex-start', marginTop: '0px' }}>
              <Button text="Agree" size="small" color="blue" theme="outlined" onClick={this.handleClick} />
            </ButtonsGroup>

          </ContentWrapper>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationPermissionModal);
