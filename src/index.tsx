import ReactDOM from 'react-dom';
import './index.css';
import Routes from './routes';
import 'semantic-ui-css/semantic.min.css';
import { setContext } from '@apollo/client/link/context';

import { 
  ApolloProvider, 
  ApolloClient, 
  HttpLink, 
  InMemoryCache, 
} from '@apollo/client';

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });

const authPreLink = setContext((_, { headers }) => {
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

const client = new ApolloClient({
  link: authPreLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
)


ReactDOM.render(
  App,
  document.getElementById('root')
);
