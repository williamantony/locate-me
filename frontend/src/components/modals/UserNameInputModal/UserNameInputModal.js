import React, { Component } from 'react';
import './UserNameInputModal.css';
import ModalTitle from '../../ModalTitle/ModalTitle';
import ContentWrapper from '../../ContentWrapper/ContentWrapper';
import ParagraphText from '../../ParagraphText/ParagraphText';
import ButtonsGroup from '../../ButtonsGroup/ButtonsGroup';
import Button from '../../Button/Button';
import TextInput from '../../TextInput/TextInput';

class UserNameInputModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
    };
  }
  
  setInput = (name, value) => {
    this.setState({
      [name]: value,
    });
  }

  handleClick = e => {
    e.preventDefault();
    this.props.onClick(this.state.name);
  }

  render() {
    return (
      <div className="UserNameInputModal">
        <ModalTitle text="Set Name" align="left" />
        <div className="UserNameInputModal__content">
          <ContentWrapper>

            <ParagraphText style={{ padding: '25px 0px' }}>
              Your name will be used in new location requests.
            </ParagraphText>

            <TextInput
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.setInput}
              label="Your Name"
            />

            <ButtonsGroup style={{ justifyContent: 'flex-start', marginTop: '0px' }}>
              <Button text="Save & Continue" size="small" color="blue" theme="outlined" onClick={this.handleClick} />
            </ButtonsGroup>

          </ContentWrapper>
        </div>
      </div>
    );
  }

}

export default UserNameInputModal;
