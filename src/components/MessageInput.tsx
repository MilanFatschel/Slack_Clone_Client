import React from 'react';
import { RiSendPlane2Line } from 'react-icons/ri'

import "./MessageInput.css";

interface IMessageInputProps {
    className?: string
}

interface IMessageInputState {
    text: string
}

class MessageInput extends React.Component<IMessageInputProps, IMessageInputState> {
    constructor(props: IMessageInputProps) {
        super(props);
        this.state = {
            text: ''
        }

        this.onSendClick = this.onSendClick.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    componentWillUnmount() {
    }

    onSendClick() {
        this.submitMessage(this.state.text);
    }

    submitMessage(message: String) {
        if(message.length === 0) return;
        console.log(message);
        this.setState({text: ''});
    }

    onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        this.setState({text: value});
    }

    onKeyPress(e: any) {
        if (e.charCode === 13) {
            const { text } = this.state;
            this.submitMessage(text);
          }
    }

    render() {
        const { text } = this.state;
        const disableSend = text.length > 0 ? false : true;
        const disableSendClass = disableSend ? "send-button-disable" : "";

        return (
            <div className="message-input">
                <div className="message-box"> 
                  <input id="text-input"
                  type="text" 
                  value={text}
                  placeholder={"Send a message"}
                  onChange={this.onChangeText}
                  onKeyPress={this.onKeyPress}
                  >
                  </input>  
                  <div className="action-buttons">
                    <button id="send-button" className={disableSendClass} onClick={this.onSendClick} disabled={disableSend}>
                        <RiSendPlane2Line style={{color: "white", fontSize: "20px"}} ></RiSendPlane2Line>
                    </button>
                  </div>
                </div>
            </div>

        )
    }
}


export default MessageInput;