import React from "react";
import UserInformationModal from "../components/Modals/UserInformationModal";
import { IUser } from "../interfaces/IUser";
import profile from "./../assets/profile.png";
import "./HeaderBar.css";

interface IHeaderBarProps {
    user?: IUser
}

interface IHeaderBarState {
    displayUserInformationModal: boolean
}

export class HeaderBar extends React.Component<IHeaderBarProps, IHeaderBarState> {
    constructor(props: IHeaderBarProps) {
        super(props);
        this.state = {
            displayUserInformationModal: false
        }

        this.onProfileClick = this.onProfileClick.bind(this);
    }

    onProfileClick = () => {
        this.setState({displayUserInformationModal: true})
    }

    closeModal = () => {
        this.setState({displayUserInformationModal: false})
    }

    render() {
        const { displayUserInformationModal } = this.state;
        const { user } = this.props;

        return (
            <div className="header-bar">
                <div className="profile-image-header" onClick={() =>this.onProfileClick()}>
                  <img src={profile} alt="Profile Error" width={32} height={32}></img>
                </div>   
                <UserInformationModal
                open={displayUserInformationModal}
                closeModal={this.closeModal}
                user={user}
                ></UserInformationModal>            
            </div>
        )
    }
}