import React from 'react';
import "./MainView.css";
import SideBar from '../containers/SideBar';
import { withApollo } from '@apollo/client/react/hoc';
import ITeam from '../interfaces/ITeam';
import IChannel from '../interfaces/IChannel';
import { Redirect } from 'react-router-dom';
import { GET_ALL_TEAMS } from '../graphql/team';
import MessagesView from '../containers/MessagesView';

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
            const invitedTeams = res.data.invitedTeams ? res.data.invitedTeams : [];
            this.setState({allTeams: [...res.data.allTeams, ...invitedTeams]})
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
        let currentTeam = undefined;
        let currentChannel = undefined;

        if(!loadingTeams && allTeams.length === 0) {
            return (<Redirect to="/create-team"></Redirect>)
        }

        let currentTeamIdx = allTeams.findIndex((team) => team.id === parseInt(teamId));
        let currentChannelIdx: number = 0;
        if(currentTeamIdx !== -1) {
            currentTeam = allTeams[currentTeamIdx];
            currentChannelIdx = currentTeam.channels.findIndex((channel) => channel.id === parseInt(channelId));
            if(currentChannelIdx !== -1) {
                currentChannel = currentTeam.channels[currentChannelIdx];
            }
        } else {
            currentTeamIdx = 0;
            currentTeamIdx = 0;
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
                {
                    currentChannel ? 
                    <MessagesView
                    currentChannel={currentChannel}>
                    </MessagesView> : null
                }
            </div>
        )
    }
}

export default withApollo<IMainViewProps, IMainViewState>(MainView);