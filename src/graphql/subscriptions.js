import { gql } from '@apollo/client';

export const GET_SONG = gql`
    subscription getSong {
        songs(order_by: {created_at: desc}) {
          url
          title
          thumbnail
          id
          duration
          artist
    }
  }
`;