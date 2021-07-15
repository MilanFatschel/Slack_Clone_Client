import profile from "./../assets/profile.png";
import "./Message.css";

interface IMessageProps {
    username: string,
    timeStamp: string,
    text: string
}

const Message = (props: IMessageProps) => {
    
   const formattedDate = new Date(parseInt(props.timeStamp, 10)).toLocaleTimeString([], {timeStyle: 'short'});

    return (
        <div className="message-container">
            <div className="profile-image-message">
              <img src={profile} alt="Profile Error" width={40} height={40}></img>
            </div>   
            <div className="message-header">
                <span className="name">{props.username} &nbsp;&nbsp;&nbsp;</span>
                 
                <span className="time">{formattedDate}</span>
            </div>    
            <div className="message-body">{props.text}</div>   
        </div>
    )

};


export default Message;