import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createBeacon, hideModal } from '../../../redux/actions';
import './AddNewBeacon.css';
import ModalTitle from '../../ModalTitle/ModalTitle';
import ContentWrapper from '../../ContentWrapper/ContentWrapper';
import ParagraphText from '../../ParagraphText/ParagraphText';
import ButtonsGroup from '../../ButtonsGroup/ButtonsGroup';
import Button from '../../Button/Button';
import TextInput from '../../TextInput/TextInput';

class AddNewBeacon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  componentDidMount() {
    console.warn('Hide ShowConnectionsModal on componentDidMount()');
    // setTimeout(() => {
      // this.props.hideModal('ShowConnectionsModal');
    // }, 500);
  }

  setInput = (name, value) => {
    this.setState({
      [name]: value,
    });
  }

  handleClick = e => {
    e.preventDefault();
    const x = this.props.createBeacon(this.state.name);
    x.then((data) => {
      console.log('BEACON', data);
    })
  }

  render() {
    return (
      <div className="AddNewBeacon">
        <ModalTitle text="Add a beacon" align="left" />
        <div className="AddNewBeacon__content">
          <ContentWrapper>

            <ParagraphText style={{ padding: '25px 0px' }}>
              A beacon is a device that transmits realtime location to you.  
            </ParagraphText>

            <TextInput
              type="text"
              name="name"
              onChange={this.setInput}
              label="Beacon Name"
            />

            <ButtonsGroup style={{ justifyContent: 'flex-end', marginTop: '0px' }}>
              <Button text="Add Beacon" color="blue" theme="filled" onClick={this.handleClick} />
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
  createBeacon,
  hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewBeacon);
