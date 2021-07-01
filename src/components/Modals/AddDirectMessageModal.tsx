import { Button, Modal, Input } from 'semantic-ui-react'

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
      <Modal.Description style = {{
          'display': 'flex',
          'height': '100%',
          'alignItems': 'center',
          'justifyContent': 'center'
        }}>
          <Input
           style={{'width': '50%'}}
           placeholder={`Enter an email to direct message a new user`}>
          </Input>
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
          disabled={true}
        />
      </Modal.Actions>
    </Modal>
  )
}

export default AddDirectMessageModal
