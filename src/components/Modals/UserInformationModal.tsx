import { Button, Modal } from 'semantic-ui-react'
import { IUser } from '../../interfaces/IUser'
import { withRouter } from "react-router-dom";

interface IUserInformationModalProps {
  open: boolean,
  closeModal: Function,
  user?: IUser
  history: any,
  location: any,
  match: any
}

const UserInformationModal = (props: IUserInformationModalProps) => {
  const { user } = props;

  const logOut = () => {
    window.localStorage.clear();
    props.closeModal()
    props.history.push("/login");
  };


  return (
    <Modal
      onClose={() => props.closeModal()}
      open={props.open}
    >
      <Modal.Header>{user?.username}</Modal.Header>
      <Modal.Content>
        <Modal.Description style={{"display": "flex", "flexDirection": "column"}}>
          <div> <strong>Username:</strong>&nbsp;{user?.username}</div>
          <div> <strong>Email:</strong>&nbsp;{user?.email}</div>
          <div> <strong>ID:</strong>&nbsp;{user?.id}</div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
      <Button color='red' onClick={logOut}>
          Logout
        </Button>
        <Button color='black' onClick={() => props.closeModal()}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default withRouter<IUserInformationModalProps, any>(UserInformationModal);
