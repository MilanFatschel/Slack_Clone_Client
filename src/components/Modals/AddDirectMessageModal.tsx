import { Button, Header, Modal, Input } from 'semantic-ui-react'

interface IAddDirectMessageModalProps {
  open: boolean,
  closeModal: Function
}

const AddDirectMessageModal = (props: IAddDirectMessageModalProps) => {
  return (
    <Modal
      onClose={() => props.closeModal()}
      open={props.open}
    >
      <Modal.Header>Create A New Direct Message</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>To:</Header>
          <Input></Input>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => props.closeModal()}>
          Cancel
        </Button>
        <Button
          content="Create"
          labelPosition='right'
          icon='checkmark'
          onClick={() => props.closeModal()}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default AddDirectMessageModal
