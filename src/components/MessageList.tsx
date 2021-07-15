import { useSubscription } from '@apollo/client';
import { useState } from 'react';
import { NEWCHANNELMESSAGESUBSCRIPTION } from '../graphql/message';
import IMessage from '../interfaces/IMessage';
import Message from "./Message";
import "./MessageList.css";

interface IMessageListProps {
    className?: string,
    messages: IMessage[],
    currentChannelId: number,
    onNewChannelMessage: Function,
    onLoadMoreMessages: Function
}

const MessageList = (props: IMessageListProps) => {
  let { messages } = props;
  const [scroll, setScroll] = useState<HTMLDivElement>();
  let reversedMessages = [...messages].reverse();


  const handleScroll = () => {
    if(!scroll) return;

    if(scroll.scrollHeight -  Math.abs(scroll?.scrollTop) === scroll.clientHeight) {
      props.onLoadMoreMessages().then((success: boolean) => {
      })
      .catch((err: boolean) => {});
    }
  }

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
    <div className="message-list"
    onScroll={handleScroll}
    ref={(scroller: HTMLDivElement) => {
      setScroll(scroller);
    }}>
      <ul>
        {
          reversedMessages.map((message: IMessage) => (
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