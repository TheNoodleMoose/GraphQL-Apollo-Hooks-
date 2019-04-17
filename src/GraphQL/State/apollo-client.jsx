import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { withClientState } from "apollo-link-state";
import { ApolloLink } from "apollo-link";
import defaults from "./default";
import resolvers from "../Resolvers";
import { createHttpLink } from "apollo-link-http";

// Define our new HttpLink for Apollo
const httplink = createHttpLink({
  uri: "https://swapi.apis.guru"
});

// Create our new cache from InMemoryCache
const cache = new InMemoryCache();
const stateLink = withClientState({
  cache,
  defaults,
  resolvers
});

export const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink, httplink])
});
