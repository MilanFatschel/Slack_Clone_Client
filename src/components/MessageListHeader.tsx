import React from 'react';
import { IoIosArrowDown } from 'react-icons/io'

import "./MessageListHeader.css";
import AddUserToChannelModal from './Modals/AddUserToChannelModal';

interface IHeaderProps {
    className?: string,
    currentChannelName?: string
}

interface IHeaderState {
    showAddUserToChannelModal: boolean
}

class Header extends React.Component<IHeaderProps, IHeaderState> {
    constructor(props: IHeaderProps) {
        super(props);
        this.state = {
            showAddUserToChannelModal: false, 
        }

        this.onChannelNameClick = this.onChannelNameClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onAddUserToChannelSuccess = this.onAddUserToChannelSuccess.bind(this);
    }

    onChannelNameClick = () => {
        this.setState({showAddUserToChannelModal: true})
    }

    closeModal = () => {
        this.setState({showAddUserToChannelModal: false})
    }

    onAddUserToChannelSuccess = () => {

    }

    render() {
        const { showAddUserToChannelModal} = this.state;
        const currentChannelName = this.props.currentChannelName as string;
        const displayName = currentChannelName?.length > 0 ? `# ${currentChannelName}`: ''

        return (
            <div className="message-list-header">
                <div className="clickable" onClick={() => this.onChannelNameClick()}>
                  {displayName}
                  <IoIosArrowDown 
                    size={13} 
                  ></IoIosArrowDown>
                </div> 
                <AddUserToChannelModal
                open={showAddUserToChannelModal}
                closeModal={this.closeModal}
                onAddUserToChannelSuccess={this.onAddUserToChannelSuccess}
                channelName={currentChannelName}
                teamId={1}
                ></AddUserToChannelModal>   
            </div>

        )
    }
}


export default Header;