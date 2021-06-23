import React from "react";
import _ from 'lodash';
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';

import ChannelList from "../components/ChannelList";
import TeamList from "../components/TeamList";

import ITeam from "../interfaces/ITeam";

interface IAllTeamsResponseData {
    loading: boolean,
    allTeams: ITeam[]
}

interface ISideBarProps {
    data?: IAllTeamsResponseData,
    currentTeamId: string
}

const SideBar = (props: ISideBarProps) => {
    let { data, currentTeamId } = props;
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

    if(!data || data.loading) {
        return loadingRender;
    }

    const { allTeams } = data; 
    const teamIdx = currentTeamId ? _.findIndex(allTeams, (team) => team.id === parseInt(currentTeamId, 10)): 0;
    const currentTeam = teamIdx === -1 ? null : allTeams[teamIdx];
    
    return (
        <React.Fragment>
            <div className="team-list">
              <TeamList teams={allTeams || []}></TeamList>
            </div>
            <div className="channel-list">
                <ChannelList
                  channels={currentTeam?.channels || []}
                  teamName={currentTeam?.name || ''}
                ></ChannelList>
            </div>
        </React.Fragment>
    )
}

const ALLTEAMS = gql`
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

export default graphql<ISideBarProps>(ALLTEAMS)(SideBar);