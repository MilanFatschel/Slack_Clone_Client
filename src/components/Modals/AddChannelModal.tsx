import { Button, Header, Modal, Input } from 'semantic-ui-react'

import { graphql } from '@apollo/client/react/hoc';
import { useState } from 'react';
import CREATECHANNEL from './../../graphql/team'

interface IAddChannelModalProps {
  open: boolean,
  closeModal: Function,
  onAddChannelSuccess: Function,
  mutate?: any,
  teamId?: number
}

const AddChannelModel = (props: IAddChannelModalProps) => {
  const [state, setState] = useState({
    channelName: '',
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
      <Modal.Header>Create A New Channel</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Channel Name:</Header>
          <Input value={state.channelName} onChange={(e) => 
            setState({channelName: e.target.value, isLoading: state.isLoading})}>
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
              const response  = await props.mutate({ 
                variables: 
                { 
                  teamId: props.teamId, 
                  name: state.channelName
                } 
              })
              props.onAddChannelSuccess(response.data.createChannel.channel) 
            } catch(error) {
              console.log(error);
            }
            setState({...state, channelName:'', isLoading: false});
            props.closeModal()
          }}
          positive
        />
        <IsLoadingIcon></IsLoadingIcon>
      </Modal.Actions>
    </Modal>
  )
}

export default graphql<IAddChannelModalProps>(CREATECHANNEL)(AddChannelModel)
