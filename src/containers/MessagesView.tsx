import React from "react";
import { withApollo } from '@apollo/client/react/hoc';
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import MessageListHeader from "../components/MessageListHeader";
import IChannel from "../interfaces/IChannel";
import IMessage from "../interfaces/IMessage"
import { CREATEMESSAGE, GETMESSAGES } from "../graphql/message";
interface IMessageProps {
    data?: any
    client?: any,
    currentChannel: IChannel
}

interface IMessageState {
    loadingMessages: boolean,
    messages: IMessage[]
}

class MessagesView extends React.Component<IMessageProps, IMessageState> {
    constructor(props: IMessageProps) {
        super(props);
        this.state = {
            loadingMessages: true,
            messages: []
        }

        this.onMessageSubmit = this.onMessageSubmit.bind(this);
        this.onNewChannelMessage = this.onNewChannelMessage.bind(this);
    }

    componentDidMount() {
        this.getMessagesForChannel(this.props.currentChannel.id);
    }

    componentDidUpdate(prevProps: IMessageProps) {
        if(prevProps.currentChannel.id !==this.props.currentChannel.id){
          this.getMessagesForChannel(this.props.currentChannel.id);
        }
    }

    getMessagesForChannel = async(channelId: number) => {
        this.setState({loadingMessages: true})
        this.props.client
        .query({
          query: GETMESSAGES,
          variables: {
              channelId
          },
          fetchPolicy: 'network-only'
        },).then((res: any) => {
            console.log(res.data.messages);
            this.setState({messages: res.data.messages, loadingMessages: false});
        });
    }

    onMessageSubmit = async(message: string) => {
        this.props.client
        .mutate({
          mutation: CREATEMESSAGE,
          variables: {
              channelId: this.props.currentChannel.id,
              text: message
          }
        })
    }

    onNewChannelMessage = (message: IMessage) => {
      const { messages } = this.state;
      console.log(message);
      const addedMessageList = [...messages, message];
      this.setState({messages: addedMessageList});
    }
    
    render() {
        const { currentChannel } = this.props;
        const { loadingMessages, messages } = this.state;

        const loadingRender = (
            <div>Loading...</div>
        )

        if(loadingMessages) return loadingRender;

        return (
            <React.Fragment>
                <MessageListHeader className="message-header"
                 currentChannelName={currentChannel.name || ''}
                ></MessageListHeader>
                <MessageList className="message-list"
                currentChannelId={currentChannel.id}
                messages={messages}
                onNewChannelMessage={this.onNewChannelMessage}
                ></MessageList>
                <MessageInput className="message-input"
                  currentChannelName={currentChannel.name || ''}
                  onMessageSubmit={this.onMessageSubmit}>
                </MessageInput>
            </React.Fragment>
        )
    }
}

export default withApollo<IMessageProps, IMessageState>(MessagesView);