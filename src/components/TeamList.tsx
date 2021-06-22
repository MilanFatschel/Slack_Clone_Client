import React from 'react';

import "./TeamList.css";

interface ITeamListProps {
    className?: String
}

interface ITeamListState {
    teams: any[]
}

class TeamList extends React.Component<ITeamListProps, ITeamListState> {
    state = {
        teams: ["team1", "team2", "team3", "team4"]
    }

    render() {
        const { teams } = this.state;

        return (
            <div className="team-list">
                <div className="header">
                  <h3>Teams</h3>
                </div>
                <ul>
                  {
                    teams.map((team: String, teamIdx: number) => (
                        <li key={teamIdx}>
                            <div className="list-row">
                                {team}
                            </div>
                        </li>
                    ))
                  }
                </ul>
            </div>

        )
    }
}


export default TeamList;