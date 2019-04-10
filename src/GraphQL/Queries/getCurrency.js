import gql from "graphql-tag";

export const GET_CURRENCY = gql`
  {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;
