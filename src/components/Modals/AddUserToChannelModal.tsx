import { Button, Modal, Input } from 'semantic-ui-react'

import { graphql } from '@apollo/client/react/hoc';
import { useState } from 'react';
import { ADDTEAMMEMEBER } from './../../graphql/team'

interface IAddUserToChannelModalProps {
  open: boolean,
  closeModal: Function,
  onAddUserToChannelSuccess: Function,
  mutate?: any,
  teamId: number
  channelName: string
}

const AddUserToChannelModal = (props: IAddUserToChannelModalProps) => {
  const [state, setState] = useState({
    email: '',
    isLoading: false
  })

  const IsLoadingIcon = (): any => {
    if(!state.isLoading) {
      return null;
    } 

    return <div>Loading...</div>
  }

  return (
    <Modal
      onClose={() => props.closeModal()}
      open={props.open}
    >
      <Modal.Header>Add A User To # {props.channelName}</Modal.Header>
      <Modal.Content>
        <Modal.Description style = {{
          'display': 'flex',
          'height': '100%',
          'alignItems': 'center',
          'justifyContent': 'center'
        }}>
          <Input 
          style={{'width': '50%'}}
          value={state.email} 
          onChange={(e) => setState({email: e.target.value, isLoading: state.isLoading})}
          placeholder={`Enter an email to add a user to # ${props.channelName}`}>
          </Input>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => {
          setState({...state, email:'', isLoading: false});
          props.closeModal()
          }}>
          Cancel
        </Button>
        <Button
          content="Create"
          labelPosition='right'
          icon='checkmark'
          disabled={state.email.length === 0}
          onClick={
          async () => {
            setState({...state, isLoading: true});
            try {
              const response  = await props.mutate({ 
                variables: 
                { 
                  email: state.email,
                  teamId: props.teamId
                } 
              })
              console.log(response);
              // props.onAddUserToChannelSuccess(response.data.createChannel.channel) 
            } catch(error) {
              console.log(error);
            }
            setState({...state, email:'', isLoading: false});
            props.closeModal()
          }}
          positive
        />
        <IsLoadingIcon></IsLoadingIcon>
      </Modal.Actions>
    </Modal>
  )
}

export default graphql<IAddUserToChannelModalProps>(ADDTEAMMEMEBER)(AddUserToChannelModal)
