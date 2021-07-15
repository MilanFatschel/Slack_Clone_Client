import React from 'react';
import { IoIosAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';

import "./TeamList.css";

interface ITeamListProps {
    className?: String,
    teams: any[],
    currentTeamIdx: number
}


interface ITeamListState {
}

class TeamList extends React.Component<ITeamListProps, ITeamListState> {

    constructor(props: ITeamListProps) {
        super(props);
        this.state = {
            displayTeams: []
        }
    }

    render() {
        const { teams } = this.props;
        
        return (
            <React.Fragment>
                <div className="header">
                  <h3>Teams</h3>
                </div>
                <ul>
                  {
                    teams.map((team, idx) => (
                        <li key={team.id}>
                            <Link to={`/main/${team.id}`}>
                                <div className="list-row">
                                  <div className="team-icon" 
                                  style={
                                      idx === this.props.currentTeamIdx ? {"border": "thin solid white"} : {}
                                  }>
                                    {team.name[0].toUpperCase()}
                                  </div>
                                </div>
                            </Link>
                        </li>
                    ))
                }
                    <li>
                      <Link to={`/create-team`}>
                          <div className="list-row">
                              <IoIosAdd id="add-icon" size={26}></IoIosAdd>
                            </div>
                        </Link>
                    </li>
                </ul>
            </React.Fragment>

        )
    }
}

export default TeamList;