import gql from "graphql-tag";

export const GET_CURRENCY = gql`
  {
    allFilms {
      films {
        title
      }
    }
  }
`;
