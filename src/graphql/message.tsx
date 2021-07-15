import { gql } from '@apollo/client';

// Queries 
export const GETMESSAGES = gql`
query($cursor: String, $channelId: Int!) {
    messages(cursor: $cursor, channelId: $channelId) {
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
