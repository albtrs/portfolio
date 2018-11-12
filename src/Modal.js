import React, { Component } from 'react';
import styled from 'styled-components'

class Modal extends Component {
  

  componentWillMount() {
    window.addEventListener("click", (e) => {
      const name = e.target.className.split(/ /)[0];
      if (name === "___modalarea___" && this.props.open) {
        this.props.onClose();
      } 
    });
  }

  render() {

    const Base = styled.div`
      z-index: 9998;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.7);
      display: ${props => props.open ? "block" : "none"};
    `

    const Area = styled.div`
      z-index: 9999;
      height: 100vh;
      justify-content: center;
      align-items: center;
      display: ${props => props.open ? "flex" : "none"};
    `

    return (
      <Base open={this.props.open}>
        <Area className="___modalarea___"  open={this.props.open}>
          {this.props.children}
        </Area>
      </Base>       
    );
  }
}

export default Modal;
