import { gql } from '@apollo/client';

// Queries
export const GET_ALL_TEAMS = gql`
{
    allTeams {
        id
        name
        channels {
            id
            name
        }
    }
    inviteTeams {
      id
      name
      channels {
        id
        name
      }
    }
}
`

// Mutations
export const CREATECHANNEL = gql`
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

export const ADDTEAMMEMEBER = gql`
  mutation($email: String!, $teamId: Int!) {
    addTeamMember(email: $email, teamId: $teamId) {
      ok
    }
  }
`