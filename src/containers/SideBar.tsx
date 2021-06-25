import React from "react";
import { withApollo } from '@apollo/client/react/hoc';

import ChannelList from "../components/ChannelList";
import TeamList from "../components/TeamList";
import ITeam from "../interfaces/ITeam";
import AddChannelModel from "../components/Modals/AddChannelModal";
import AddDirectMessageModel from "../components/Modals/AddDirectMessageModal";
import IChannel from "../interfaces/IChannel";

interface ISideBarProps {
    data?: any
    client?: any,
    allTeams: ITeam[],
    loadingTeams: boolean,
    currentTeamIdx: number,
    currentChannelIdx: number
    addChannelToState: Function
}

interface ISideBarState {
    showAddChannelModal: boolean,
    showAddDirectMessageModal: boolean,
}

class SideBar extends React.Component<ISideBarProps, ISideBarState> {
    constructor(props: ISideBarProps) {
        super(props);
        this.state = {
            showAddChannelModal: false,
            showAddDirectMessageModal: false,
        }

        this.onAddChannelClick = this.onAddChannelClick.bind(this);
        this.onAddDirectMessageClick = this.onAddDirectMessageClick.bind(this);
        this.onAddChannelSuccess = this.onAddChannelSuccess.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    onAddChannelClick = () => {
        this.setState({showAddChannelModal: true});
    }

    onAddDirectMessageClick = () => {
        this.setState({showAddDirectMessageModal: true});       
    }

    onAddChannelSuccess = (addedChannel: IChannel) => {
        this.props.addChannelToState(addedChannel);
    }

    closeModal = () => {
        this.setState({
            showAddDirectMessageModal: false,
            showAddChannelModal: false
        });       
    }
    
    render() {
        const { currentTeamIdx, currentChannelIdx, allTeams, loadingTeams} = this.props;

        const loadingRender = (
            <React.Fragment>
                <div className="team-list loading">
                    Loading...
                </div>
                <div className="channel-list loading">
                    Loading...
                </div>
            </React.Fragment>      
        )

        if(loadingTeams) {
            return loadingRender;
        }

        return (
            <React.Fragment>
                <div className="team-list">
                  <TeamList 
                    teams={allTeams}
                    currentTeamIdx={currentTeamIdx}
                    ></TeamList>
                </div>
                <div className="channel-list">
                    <ChannelList
                      onAddChannelClick={this.onAddChannelClick}
                      onAddDirectMessageClick={this.onAddDirectMessageClick}
                      channels={allTeams[currentTeamIdx].channels || []}
                      teamName={allTeams[currentTeamIdx].name || ''}
                      teamId={allTeams[currentTeamIdx].id}
                      currentChannelIdx={currentChannelIdx}
                    ></ChannelList>
                </div>
                <AddChannelModel 
                open={this.state.showAddChannelModal} 
                closeModal={this.closeModal}
                teamId={allTeams[currentTeamIdx].id}
                onAddChannelSuccess={this.onAddChannelSuccess}
                />
                <AddDirectMessageModel 
                open={this.state.showAddDirectMessageModal} 
                closeModal={this.closeModal}
                />
            </React.Fragment>
        )
    }
}

export default withApollo<ISideBarProps, ISideBarState>(SideBar);