import React from 'react';
import { Message, Input, Container, Header, Button } from 'semantic-ui-react';
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';

import './Login.css';
import { Link } from 'react-router-dom';

interface ILoginState {
    email: String,
    password: String
    passwordError: String,
    emailError: String
}

interface ILoginProps {
    mutate?: any,
    history? : any
}

interface IErrorResponse {
    path: string,
    message: string
}

class Login extends React.Component<ILoginProps, ILoginState> {
    state = {
        email: '',
        password: '',
        emailError: '',
        passwordError: ''
    }

    onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        this.setState({email: value});
    };

    onChangePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        this.setState({password: value});
    };

    onSubmit = async(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.setState({
            emailError: '',
            passwordError: ''
        })

        const response = await this.props.mutate({
            variables: this.state
        })

        const {errors, token, refreshToken, ok} = response.data.login;

        console.log(response);

        if(ok) {
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            this.props.history.push('/create-team');
        } else {
            const errorMap = new Map<String, String>();
            errors.forEach((e: IErrorResponse) => {
                errorMap.set(`${e.path}Error`, e.message);
            });
            this.setState(Object.fromEntries(errorMap));
        }
    }

    render() {

        const {email, password, emailError, passwordError} = this.state;
        const errorList = [];

        if(passwordError.length > 0) errorList.push(passwordError);
        if(emailError.length > 0) errorList.push(emailError); 

        return (
            <div className="login-page">
                <div className="login-box">
                    <Header id="login-text" as="h2">
                        Login
                    </Header>
                    <Input
                        name="email"
                        onChange={this.onChangeEmail}
                        error={emailError.length > 0}
                        value={email}
                        placeholder="Email"
                        fluid
                    />
                    <Input
                        name="password"
                        type="password"
                        onChange={this.onChangePassword}
                        error={passwordError.length > 0}
                        value={password}
                        placeholder="Password"
                        fluid
                    />
                    <div className="footer">
                        <div id="sign-up-text">No account?&nbsp;&nbsp;<Link to={`/register`}>Sign up</Link></div>
                        <Button
                            onClick={this.onSubmit}
                        >
                            Login
                        </Button>
                    </div>
                    { errorList.length > 0 ? (
                        <Message
                        error
                        header="There was an issue with your submission"
                        list={errorList}
                        >
                        </Message>
                    ) : null
                    }
                </div>
            </div>
        )
    }
}

const LOGIN_USER = gql`
  mutation($email: String!, $password: String!) {
      login(email: $email, password: $password) {
          ok
          token
          refreshToken
          errors {
              path
              message
          }
      }
  }
`;

export default graphql<ILoginProps, ILoginState>(LOGIN_USER)(Login);