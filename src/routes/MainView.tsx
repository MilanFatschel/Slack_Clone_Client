import React from 'react';
import MessageList from '../components/MessageList';
import MessageListHeader from '../components/MessageListHeader';
import MessageInput from '../components/MessageInput';
import "./MainView.css";
import SideBar from '../containers/SideBar';

interface IMainViewState {
    selectedTeam: number,
    selectedChannel: number
}

interface IMainViewProps {
    match?: any;
}

class MainView extends React.Component<IMainViewProps, IMainViewState> {

    render() {
        return (
            <div className="main-view">
                <SideBar currentTeamId={this.props.match.params.teamId}></SideBar>
                <MessageListHeader className = "message-header"></MessageListHeader>
                <MessageList className = "message-list"></MessageList>
                <MessageInput className="message-input"></MessageInput>
            </div>
        )
    }
}


export default MainView;