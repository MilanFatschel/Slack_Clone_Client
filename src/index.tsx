import ReactDOM from 'react-dom';
import './index.css';
import Routes from './routes';
import 'semantic-ui-css/semantic.min.css';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

import { 
  ApolloProvider, 
  ApolloClient, 
  HttpLink, 
  InMemoryCache, 
  split, 
} from '@apollo/client';

// Http link
const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });

// Websocket link
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true
  }
});

// Attach auth headers to requests
const middlewareLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      x_token: token ? `${token}` : "",
      x_refresh_token: refreshToken ? `${refreshToken}`: ""
    }
  }
});


// Combine
const httpLinkWithMiddlewear = middlewareLink.concat(httpLink);

// Split link - either http or ws depending on graphql 
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLinkWithMiddlewear,
);

// Create client with link
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

// Provide client
const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
)

// Render
ReactDOM.render(
  App,
  document.getElementById('root')
);
