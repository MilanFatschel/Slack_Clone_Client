import { Button, Modal } from 'semantic-ui-react'
import { IUser } from '../../interfaces/IUser'

interface IUserInformationModalProps {
  open: boolean,
  closeModal: Function,
  user?: IUser
}

const UserInformationModal = (props: IUserInformationModalProps) => {
    const { user } = props;
  return (
    <Modal
      onClose={() => props.closeModal()}
      open={props.open}
    >
      <Modal.Header>{user?.username}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => props.closeModal()}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default UserInformationModal
