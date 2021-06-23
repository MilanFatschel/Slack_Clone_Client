import React from 'react';
import { IoIosAdd } from 'react-icons/io'
import IChannel from '../interfaces/IChannel';

import "./ChannelList.css";

interface IChannelListProps {
    className?: string
    channels: IChannel[]
    teamName: string
}

interface IChannelListState {
    directMessages: any[]
}

class ChannelList extends React.Component<IChannelListProps, IChannelListState> {
    state = {
        directMessages: ["Milan", "Deen", "Justin", "Nikhil", "Dre", "Ben"]
    }

    render() {
        const { teamName, channels } = this.props;
        const { directMessages } = this.state;

        return (
            <React.Fragment>
              <div className="header">
                <h3>{teamName}</h3>
              </div> 
              <div className="header-row">
                <h4 className="header">Channels</h4>
                <IoIosAdd id="add-icon" color={"#CFC2CF"} size={26}></IoIosAdd>
              </div>
                <ul className="channels">
                {
                    channels.map((channel: IChannel, channelIdx: number) => (
                        <li key={channel.id}>
                            <div className="list-row">
                                {channel.name}
                            </div>
                        </li>
                    ))
                }
                </ul>
                <div className="header-row">
                  <h4 className="header">Direct Messages</h4>
                  <IoIosAdd id="add-icon" color={"#CFC2CF"} size={26}></IoIosAdd>
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