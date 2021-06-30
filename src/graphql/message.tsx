import { gql } from '@apollo/client';

// Queries 
export const GETMESSAGES = gql`
query($channelId: Int!) {
    messages(channelId: $channelId) {
        id
        text
        user {
            username
        }
        created_at
    }
}
`;

// Mutations
export const CREATEMESSAGE = gql`
  mutation($channelId: Int!, $text: String!) {
    createMessage(channelId: $channelId, text: $text)
  }
`;

// Subscriptions
export const NEWCHANNELMESSAGESUBSCRIPTION = gql`
  subscription($channelId: Int!) {
    newChannelMessage(channelId: $channelId) {
      id
      text
      user {
        username
      }
      created_at
    }
  }
`;
