import gql from "graphql-tag";

// Query for grabbing name of clicked tab and updating the currentTab value with that new value
export default (_, { name }, { cache }) => {
  const query = gql`
    query GetTabName {
      apolloClient @client {
        currentTab
      }
    }
  `;

  //   From our cache read the the old query
  const previousState = cache.readQuery({ query });

  //   Set data to all of the information from the last query and then override that old queries currentTab value with the new name value
  const data = {
    apolloClient: {
      ...previousState.apolloClient,
      currentTab: name
    }
  };

  // We then write over our cache with our new query and pass it our new query data value
  cache.writeQuery({
    query,
    data
  });

  return null;
};
