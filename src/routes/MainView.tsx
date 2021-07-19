import React from 'react';
import "./MainView.css";
import SideBar from '../containers/SideBar';
import { withApollo } from '@apollo/client/react/hoc';
import ITeam from '../interfaces/ITeam';
import IChannel from '../interfaces/IChannel';
import { GET_ALL_TEAMS } from '../graphql/team';
import MessagesView from '../containers/MessagesView';
import { Redirect } from 'react-router-dom';
import { HeaderBar } from '../containers/HeaderBar';
import { IUser } from '../interfaces/IUser';
import decode from 'jwt-decode';
import { GET_USER } from '../graphql/user';
interface IMainViewState {
    allTeams: ITeam[],
    loadingTeams: boolean,
    user?: IUser
}

interface IMainViewProps {
    match?: any;
    client?: any;
    currentTeamId?: string,
    history: any
}

class MainView extends React.Component<IMainViewProps, IMainViewState> {

    constructor(props: IMainViewProps) {
        super(props)
        this.state = {
            loadingTeams: true,
            allTeams: [],
            user: undefined
        }

        this.addChannelToState = this.addChannelToState.bind(this);
    }

    componentDidMount() {
        this.getUser();
        this.getAllTeams();
    }

    getUserIdFromTokens = async() => {
        try {
            const token = localStorage.getItem('token') as string;
            const decoder = decode(token) as any;
            console.log(decoder);
            return decoder.user;
          } catch (err) {
              console.log(err);
          }
    }

    getUser = async() => {
        const { id } = await this.getUserIdFromTokens();
        console.log(id);
        this.props.client
        .query({
          query: GET_USER,
          variables: { id },
        }).then((res: any) => {
            this.setState({user: res.data.getUser})
        })   
    }

    getAllTeams = async() => {
        this.setState({loadingTeams: true})
        this.props.client
        .query({
          query: GET_ALL_TEAMS,
          variables: {},
          fetchPolicy: 'network-only'
        }).then((res: any) => {
            let allTeams = this.sortTeamChannels([...res.data.allTeams, ...res.data.inviteTeams])
            this.setState({allTeams, loadingTeams: false});
        })
    }

    sortTeamChannels = (teams: any) => {
        teams = teams.map((team: { channels: any; })=> {
            const sortedChannels = [...team.channels];
            sortedChannels.sort((a: any, b: any) =>  a.name.localeCompare(b.name));
            return {...team, channels: sortedChannels};
        });

        return teams;
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
        const { loadingTeams, allTeams, user } = this.state;
        const { teamId, channelId} = this.props.match.params;
        let currentTeam = undefined;
        let currentChannel = undefined;

        let currentTeamIdx = allTeams.findIndex((team) => team.id === parseInt(teamId));
        let currentChannelIdx: number = -1;

        // Get team and channel indexes for selection
        if(currentTeamIdx !== -1) {
            currentTeam = allTeams[currentTeamIdx];
            currentChannelIdx = currentTeam.channels.findIndex((channel) => channel.id === parseInt(channelId));
            if(currentChannelIdx !== -1) {
                currentChannel = currentTeam.channels[currentChannelIdx];
            }
        }

        if(!loadingTeams && allTeams.length === 0) {
            return <Redirect to={`/create-team`}></Redirect>
        }

        return (
            <div className="main-view">
                <HeaderBar
                user={user}
                ></HeaderBar>
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
