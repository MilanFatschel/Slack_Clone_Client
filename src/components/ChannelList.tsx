import React from 'react';

import "./ChannelList.css";

interface IChannelListProps {
    className?: String
}

interface IChannelListState {
    channels: any[],
    directMessages: any[]
}

class ChannelList extends React.Component<IChannelListProps, IChannelListState> {
    state = {
        channels: ["channel1", "channel2", "channel3", "channel4"],
        directMessages: ["Milan", "Deen", "Justin", "Nikhil", "Dre", "Ben"]
    }

    render() {
        const { channels, directMessages } = this.state;
        return (
            <div className="channel-list">
              <div className="header">
                <h3>TEAM NAME</h3>
              </div> 
                <ul className="channels">
                {
                    channels.map((channel: String, channelIdx: number) => (
                        <li key={channelIdx}>
                            <div className="list-row">
                                {channel}
                            </div>
                        </li>
                    ))
                }
                </ul>
                <h4 className="header">Direct Messages</h4>
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
            </div>

        )
    }
}


export default ChannelList;