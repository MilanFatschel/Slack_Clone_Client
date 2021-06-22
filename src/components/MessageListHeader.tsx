import React from 'react';

import "./MessageListHeader.css";

interface IHeaderProps {
    className?: String
}

interface IHeaderState {

}

class Header extends React.Component<IHeaderProps, IHeaderState> {
    state = {
    }

    render() {
        return (
            <div className="message-list-header">
                CHANNEL NAME
            </div>

        )
    }
}


export default Header;