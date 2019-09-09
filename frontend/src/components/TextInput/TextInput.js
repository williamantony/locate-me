import React, { Component } from 'react';
import './TextInput.css';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {
      value: props.value || '',
      isFilled: typeof props.value === 'string' && props.value !== '',
      isFocused: false,
    };
  }

  focusInput = e => {
    e.preventDefault();
    this.setState({
      isFocused: true,
    });
  }

  blurInput = e => {
    e.preventDefault();
    this.setState({
      isFocused: false,
    });
  }

  handleInput = e => {
    e.preventDefault();
    const { value } = e.target;

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.props.name, value);
    }

    this.setState({
      value,
      isFilled: value !== '',
    });
  }

  render() {
    const filledClass = this.state.isFilled ? ' TextInput--filled' : '';
    const focusedClass = this.state.isFocused ? ' TextInput--focused' : '';
    const className = `TextInput${filledClass}${focusedClass}`;
    
    return (
      <div className={className}>
        <div className="TextInput__holder">
          <div className="TextInput__label">
            <label className="TextInput__label__text" htmlFor="">{ this.props.label }</label>
          </div>
          <div className="TextInput__field">
            <input
              ref={this.input}
              className="TextInput__input"
              type={this.props.type}
              name={this.props.name}
              value={this.state.value}
              onChange={this.handleInput}
              onFocus={this.focusInput}
              onBlur={this.blurInput}
            />
          </div>
        </div>
      </div>
    );
  }

}

export default TextInput;
