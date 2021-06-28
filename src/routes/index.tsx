import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom'
import decode from 'jwt-decode';

import CreateTeam from './CreateTeam'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import MainView from './MainView';

interface IPrivateRouteProps {
    component: any, 
    path: string, 
    exact: boolean
}

const isAuthenticated = () => {
    const token = localStorage.getItem('token') as string;
    const refreshToken = localStorage.getItem('refreshToken') as string;
    try {
      decode(token);
      decode(refreshToken);
    } catch (err) {
      return false;
    }
  
    return true;
};
  
const PrivateRoute = ({ component: Component, ...rest }: IPrivateRouteProps) => (
    <Route
        {...rest}
        render={props =>
        (isAuthenticated() ? (
            <Component {...props} />
        ) : (
            <Redirect
            to={{
                pathname: '/login',
            }}
            />
        ))}
    />
);

  
const Routing =  () => {
    return (
        <Router>
          <Switch>
              <Route path="/" exact component={Home}></Route>
              <Route path="/register" exact component={Register}></Route>
              <Route path="/login" exact component={Login}></Route>
              <PrivateRoute path="/create-team" exact component={CreateTeam}></PrivateRoute>
              <PrivateRoute path="/main/:teamId?/:channelId?" exact component={MainView}></PrivateRoute>
          </Switch>
        </Router>
    )
}

export default Routing
