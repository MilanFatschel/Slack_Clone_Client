import React from 'react';
import MessageList from '../components/MessageList';
import ChannelList from '../components/ChannelList';
import MessageListHeader from '../components/MessageListHeader';
import MessageInput from '../components/MessageInput';
import TeamList from '../components/TeamList';
import "./MainView.css";

interface IMainViewState {
    selectedTeam: number,
    selectedChannel: number
}

interface IMainViewProps {
}

class MainView extends React.Component<IMainViewProps, IMainViewState> {
    state = {
        selectedTeam: -1,
        selectedChannel: -1
    }

    render() {
        return (
            <div className="main-view">
                <TeamList className="team-list"></TeamList>
                <ChannelList className = "channel-list"></ChannelList>
                <MessageListHeader className = "message-header"></MessageListHeader>
                <MessageList className = "message-list"></MessageList>
                <MessageInput className="message-input"></MessageInput>
            </div>
        )
    }
}


export default MainView;