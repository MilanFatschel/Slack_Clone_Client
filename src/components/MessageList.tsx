import React from 'react';
import Message from './Message';

import "./MessageList.css";

interface IMessageListProps {
    className?: String
}

interface IMessageListState {
    messages: any[];
}

class MessageList extends React.Component<IMessageListProps, IMessageListState> {
    state = {
        messages: ['1']
    }

    render() {
        const { messages } = this.state;

        return (
            <div className="message-list">
              <ul>
                {
                  messages.map((message: String, messageIdx: number) => (
                    <li key={messageIdx}>
                        <Message></Message>
                        <Message></Message>
                        <Message></Message>
                        <Message></Message>
                        <Message></Message>
                        <Message></Message>
                        <Message></Message>
                        <Message></Message>
                        <Message></Message>
                        <Message></Message>
                        <Message></Message>
                        <Message></Message>
                        <Message></Message>
                        <Message></Message>
                        <Message></Message>
                        <Message></Message>
                        <Message></Message>
                        <Message></Message>
                        <Message></Message>
                        <Message></Message>
                        <Message></Message>
                        <Message></Message>

                    </li>
                  ))
                }
              </ul>
            </div>

        )
    }
}


export default MessageList;