import { Button, Modal, Input } from 'semantic-ui-react'

import { graphql } from '@apollo/client/react/hoc';
import { useState } from 'react';
import CREATECHANNEL from './../../graphql/team'

interface IAddUserToChannelModalProps {
  open: boolean,
  closeModal: Function,
  onAddUserToChannelSuccess: Function,
  mutate?: any,
  teamId?: number
  channelName: string
}

const AddUserToChannelModel = (props: IAddUserToChannelModalProps) => {
  const [state, setState] = useState({
    username: '',
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
      <Modal.Header>Add A User To #{props.channelName}</Modal.Header>
      <Modal.Content>
        <Modal.Description style = {{
          'display': 'flex',
          'height': '100%',
          'align-items': 'center',
          'justify-content': 'center'
        }}>
          <Input 
          style={{'width': '50%'}}
          value={state.username} 
          onChange={(e) => setState({username: e.target.value, isLoading: state.isLoading})}
          placeholder={`Enter an email to add a user to #${props.channelName}`}>
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
          onClick={
          async () => {
            setState({...state, isLoading: true});
            try {
            //   const response  = await props.mutate({ 
            //     variables: 
            //     { 
            //       teamId: props.teamId, 
            //       name: state.username
            //     } 
            //   })
            //   props.onAddChannelSuccess(response.data.createChannel.channel) 
            } catch(error) {
              console.log(error);
            }
            setState({...state, username:'', isLoading: false});
            props.closeModal()
          }}
          positive
        />
        <IsLoadingIcon></IsLoadingIcon>
      </Modal.Actions>
    </Modal>
  )
}

export default graphql<IAddUserToChannelModalProps>(CREATECHANNEL)(AddUserToChannelModel)
