import { gql } from '@apollo/client';

// Queries 
export const GET_USER = gql`
query($id: Int!) {
    getUser(id: $id) {
        id
        username
        email
    }
}
`;