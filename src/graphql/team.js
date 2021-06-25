import { gql } from '@apollo/client';

// Mutations
const CREATECHANNEL = gql`
  mutation($teamId: Int!, $name: String!) {
    createChannel(teamId: $teamId, name: $name) {
      ok
      channel {
        id
        name
      }
    }
  }
`;

export default CREATECHANNEL;