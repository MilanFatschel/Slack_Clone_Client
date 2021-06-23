import React from 'react';
import { Link } from 'react-router-dom';

import "./TeamList.css";

interface ITeamListProps {
    className?: String,
    teams: any[]
}

class TeamList extends React.Component<ITeamListProps> {

    render() {
        const { teams } = this.props;

        return (
            <React.Fragment>
                <div className="header">
                  <h3>Teams</h3>
                </div>
                <ul>
                  {
                    teams.map((team) => (
                        <li key={team.id}>
                            <Link to={`/main/${team.id}`}>
                                <div className="list-row">
                                    {team.name}
                                </div>
                            </Link>
                        </li>
                    ))
                  }
                </ul>
            </React.Fragment>

        )
    }
}

export default TeamList;