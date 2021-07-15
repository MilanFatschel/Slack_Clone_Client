import { Button, Modal, Input } from 'semantic-ui-react'

import { graphql } from '@apollo/client/react/hoc';
import { useState } from 'react';
import { ADDTEAMMEMEBER } from './../../graphql/team'

interface IAddUserToTeamModalProps {
  open: boolean,
  closeModal: Function,
  onAddUserToTeamSuccess: Function,
  mutate?: any,
  teamId: number,
  teamName: string
}

const AddUserToTeamModal = (props: IAddUserToTeamModalProps) => {
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
      onClose={() => {
          setState({...state, email:'', isLoading: false});
          props.closeModal()}
        }
      open={props.open}
    >
      <Modal.Header>Add A User To  {props.teamName}</Modal.Header>
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
          placeholder={`Enter an email to add a user to ${props.teamName}`}>
          </Input>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => {
            setState({...state, email:'', isLoading: false});
            props.closeModal();
        }}>
          Cancel
        </Button>
        <Button
          content="Add"
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

export default graphql<IAddUserToTeamModalProps>(ADDTEAMMEMEBER)(AddUserToTeamModal)
