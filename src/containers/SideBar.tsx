import React from "react";
import { withApollo } from '@apollo/client/react/hoc';

import ChannelList from "../components/ChannelList";
import TeamList from "../components/TeamList";
import ITeam from "../interfaces/ITeam";
import AddChannelModal from "../components/Modals/AddChannelModal";
import AddDirectMessageModal from "../components/Modals/AddDirectMessageModal";
import IChannel from "../interfaces/IChannel";
import AddUserToTeamModal from "../components/Modals/AddUserToTeamModal";

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
    showAddUserToTeamModal: boolean
}

class SideBar extends React.Component<ISideBarProps, ISideBarState> {
    constructor(props: ISideBarProps) {
        super(props);
        this.state = {
            showAddChannelModal: false,
            showAddDirectMessageModal: false,
            showAddUserToTeamModal: false
        }

        this.onAddChannelClick = this.onAddChannelClick.bind(this);
        this.onAddDirectMessageClick = this.onAddDirectMessageClick.bind(this);
        this.onAddChannelSuccess = this.onAddChannelSuccess.bind(this);
        this.onAddUserToTeamClick = this.onAddUserToTeamClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    onAddChannelClick = () => {
        this.setState({showAddChannelModal: true});
    }

    onAddUserToTeamClick = () => {
        this.setState({showAddUserToTeamModal: true});
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
            showAddChannelModal: false,
            showAddUserToTeamModal: false
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
                      onAddUserToTeamClick={this.onAddUserToTeamClick}
                      onAddChannelClick={this.onAddChannelClick}
                      onAddDirectMessageClick={this.onAddDirectMessageClick}
                      channels={allTeams[currentTeamIdx]?.channels || []}
                      teamName={allTeams[currentTeamIdx]?.name || ''}
                      teamId={allTeams[currentTeamIdx]?.id}
                      currentChannelIdx={currentChannelIdx}
                    ></ChannelList>
                </div>
                <AddUserToTeamModal
                  open={this.state.showAddUserToTeamModal} 
                  closeModal={this.closeModal}
                  teamId={allTeams[currentTeamIdx]?.id}
                  teamName={allTeams[currentTeamIdx]?.name}
                  onAddUserToTeamSuccess={() => {}}>    
                </AddUserToTeamModal>
                <AddChannelModal 
                open={this.state.showAddChannelModal} 
                closeModal={this.closeModal}
                teamId={allTeams[currentTeamIdx]?.id}
                onAddChannelSuccess={this.onAddChannelSuccess}
                />
                <AddDirectMessageModal 
                open={this.state.showAddDirectMessageModal} 
                closeModal={this.closeModal}
                />
            </React.Fragment>
        )
    }
}

export default withApollo<ISideBarProps, ISideBarState>(SideBar);