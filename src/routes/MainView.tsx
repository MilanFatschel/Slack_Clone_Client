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

interface IMainViewState {
    allTeams: ITeam[],
    loadingTeams: boolean,
    user?: IUser
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
            allTeams: [],
            user: undefined
        }

        this.addChannelToState = this.addChannelToState.bind(this);
    }

    componentDidMount() {
        this.setState({user: this.getUserFromTokens()})
        this.getAllTeams();
    }

    getUserFromTokens = () => {
        try {
            const token = localStorage.getItem('token') as string;
            const decoder = decode(token) as any;
            return decoder.user;
          } catch (err) {
              console.log(err);
          }
    }

    getAllTeams = async() => {
        this.setState({loadingTeams: true})
        this.props.client
        .query({
          query: GET_ALL_TEAMS,
          variables: {},
          fetchPolicy: 'network-only'
        }).then((res: any) => {
            console.log(res);
            this.setState({allTeams: [...res.data.allTeams, ...res.data.inviteTeams]})
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
        const { loadingTeams, allTeams, user } = this.state;
        const { teamId, channelId} = this.props.match.params;
        let currentTeam = undefined;
        let currentChannel = undefined;

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