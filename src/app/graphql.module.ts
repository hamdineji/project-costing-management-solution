import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, ApolloLink, DefaultOptions, InMemoryCache, split} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {WebSocketLink} from '@apollo/client/link/ws';
import {getMainDefinition} from '@apollo/client/utilities';
const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}
const ws = 'ws://localhost:3000/graphql'
const uri = 'http://localhost:3000/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  
  const http = httpLink.create({
    uri,useMultipart : true
  });
  const ws = new WebSocketLink({
    uri: `ws://localhost:3000/graphql`,
    options: {
      reconnect: true,
    },
  });
  const link = split(
    // split based on operation type
    ({query}) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
      );
    },
    ws,
    http,
  );
  
  return {
    link : http,

    cache: new InMemoryCache(),
    'defaultOptions': defaultOptions
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
function createUploadLink(arg0: { uri: string; }): ApolloLink | import("@apollo/client/core").RequestHandler {
  throw new Error('Function not implemented.');
}

