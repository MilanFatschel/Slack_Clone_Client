import { useSubscription } from '@apollo/client';
import { NEWCHANNELMESSAGESUBSCRIPTION } from '../graphql/message';
import IMessage from '../interfaces/IMessage';
import Message from "./Message";
import "./MessageList.css";

interface IMessageListProps {
    className?: string,
    messages: IMessage[],
    currentChannelId: number,
    onNewChannelMessage: Function
}

const MessageList = (props: IMessageListProps) => {
  let { messages } = props;

  useSubscription(
    NEWCHANNELMESSAGESUBSCRIPTION,
    { 
      variables: { channelId: props.currentChannelId},
      onSubscriptionData: ({ subscriptionData } ) => { 
        props.onNewChannelMessage(subscriptionData.data.newChannelMessage);
      }
    },
  );


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


export default MessageList;