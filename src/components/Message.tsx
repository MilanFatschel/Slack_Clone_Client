import "./Message.css";

interface IMessageProps {
    username: string,
    timeStamp: Date,
    text: string
}

const Message = (props: IMessageProps) => {
    return (
        <div className="message-container">
            <div className="profile-image">Image</div>   
            <div className="message-header">{props.username} | {props.timeStamp}</div>    
            <div className="message-body">{props.text}</div>   
        </div>
    )

};


export default Message;