import React from 'react';
import MessageList from '../components/MessageList';
import MessageListHeader from '../components/MessageListHeader';
import MessageInput from '../components/MessageInput';
import "./MainView.css";
import SideBar from '../containers/SideBar';
import { gql } from '@apollo/client';
import { withApollo } from '@apollo/client/react/hoc';
import ITeam from '../interfaces/ITeam';
import IChannel from '../interfaces/IChannel';

interface IMainViewState {
    allTeams: ITeam[],
    loadingTeams: boolean,
}

interface IMainViewProps {
    match?: any;
    client?: any;
    currentTeamId?: string,
}

class MainView extends React.Component<IMainViewProps, IMainViewState> {

    constructor(props: IMainViewProps) {
        super(props)
        this.state = {
            loadingTeams: true,
            allTeams: []
        }

        this.addChannelToState = this.addChannelToState.bind(this);
    }

    componentDidMount() {
        this.getAllTeams();
    }

    getAllTeams = async() => {
        this.setState({loadingTeams: true})
        this.props.client
        .query({
          query: GET_ALL_TEAMS,
          variables: {}
        }).then((res: any) => {
            this.setState({allTeams: res.data.allTeams})
            this.setState({loadingTeams: false});
        })
    }

    addChannelToState = (addedChannel: IChannel) => {
        const { teamId } = this.props.match.params;
        const { allTeams } = this.state;

        if(!allTeams || !teamId) return;

        const updatedTeams = JSON.parse(JSON.stringify(allTeams)) as ITeam[];
        const teamToUpdateIdx = allTeams.findIndex((team) => team.id === parseInt(teamId));

        updatedTeams[teamToUpdateIdx].channels.push(addedChannel);

        this.setState({allTeams: updatedTeams})
    }

    render() {
        const { loadingTeams, allTeams } = this.state;
        const { teamId, channelId} = this.props.match.params;
        let currentTeam = null;
        let currentChannel = null;

        const currentTeamIdx = allTeams.findIndex((team) => team.id === parseInt(teamId));
        let currentChannelIdx: number = 0;
        if(currentTeamIdx !== -1) {
            currentTeam = allTeams[currentTeamIdx];
            currentChannelIdx = currentTeam.channels.findIndex((channel) => channel.id === parseInt(channelId));
            if(currentChannelIdx !== -1) {
                currentChannel = currentTeam.channels[currentChannelIdx];
            }
        }

        return (
            <div className="main-view">
                <SideBar 
                currentTeamIdx={currentTeamIdx}
                currentChannelIdx={currentChannelIdx}
                addChannelToState={this.addChannelToState}
                allTeams={allTeams}
                loadingTeams={loadingTeams}
                >
                </SideBar>
                <MessageListHeader className="message-header"
                 currentChannelName={currentChannel?.name || ''}
                ></MessageListHeader>
                <MessageList className="message-list"></MessageList>
                <MessageInput className="message-input"
                  currentChannelName={currentChannel?.name || ''}>
                </MessageInput>
            </div>
        )
    }
}

const GET_ALL_TEAMS = gql`
{
    allTeams {
        id
        name
        channels {
            id
            name
        }
    }
}
`


export default withApollo<IMainViewProps, IMainViewState>(MainView);