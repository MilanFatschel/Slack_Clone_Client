import React from 'react';
import { IoIosAdd } from 'react-icons/io'
import { FiSettings } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import IChannel from '../interfaces/IChannel';

import "./ChannelList.css";

interface IChannelListProps {
    className?: string
    channels: IChannel[]
    teamName: string,
    teamId: number
    onAddChannelClick: Function,
    onAddDirectMessageClick: Function,
    onAddUserToTeamClick: Function,
    currentChannelIdx: number
}

interface IChannelListState {
    directMessages: any[]
}

class ChannelList extends React.Component<IChannelListProps, IChannelListState> {
    state = {
        directMessages: ["Milan", "Deen", "Justin", "Nikhil", "Dre", "Ben"]
    }

    render() {
        const { currentChannelIdx, teamName, teamId, channels } = this.props;
        const { directMessages } = this.state;

        return (
            <React.Fragment>
              <div className="header">
                <h3>{teamName}</h3>
                <FiSettings onClick={() => this.props.onAddUserToTeamClick()} id="settings-icon" color={"#CFC2CF"} size={18}></FiSettings>
              </div> 
              <div className="header-row">
                <h4 className="header">Channels</h4>
                <IoIosAdd onClick={() => this.props.onAddChannelClick()} id="add-icon" color={"#CFC2CF"} size={26}></IoIosAdd>
              </div>
                <ul className="channels">
                {
                    channels.map((channel: IChannel, channelIdx) => (
                        <Link to={`/main/${teamId}/${channel.id}`} key={channel.id}>
                          <li>
                            <div className="list-row" style={
                                channelIdx === currentChannelIdx ? {"backgroundColor": "#1264A3" , "color": "white"} : {}
                            }>
                                {channel.name}
                            </div>
                          </li>
                        </Link>
                    ))
                }
                </ul>
                <div className="header-row">
                  <h4 className="header">Direct Messages</h4>
                  <IoIosAdd onClick={() => this.props.onAddDirectMessageClick()}id="add-icon" color={"#CFC2CF"} size={26}></IoIosAdd>
                </div>
                <ul className="dms">
                {
                    directMessages.map((dm: String, dmIdx: number) => (
                        <li key={dmIdx}>
                            <div className="list-row">
                                {dm}
                            </div>
                        </li>
                    ))
                }
                </ul>
            </React.Fragment>
        )
    }
}


export default ChannelList;