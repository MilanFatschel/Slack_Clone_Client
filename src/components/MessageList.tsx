import React from 'react';
import IMessage from '../interfaces/IMessage';
import Message from "./Message";

interface IMessageListProps {
    className?: string,
    messages: IMessage[]
}

interface IMessageListState {
}

class MessageList extends React.Component<IMessageListProps, IMessageListState> {
    render() {
        const { messages } = this.props;

        return (
            <div className="message-list">
              <ul>
                {
                  messages.map((message: IMessage) => (
                    <li key={message.id}>
                      <Message
                      username={message.user.username}
                      timeStamp={message.created_at}
                      text={message.text}
                      ></Message>
                    </li>
                  ))
                }
              </ul>
            </div>

        )
    }
}


export default MessageList;