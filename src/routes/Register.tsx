import React from 'react';
import { Message, Input, Header, Button } from 'semantic-ui-react';
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';

import './Register.css';
import { Link } from 'react-router-dom';

interface IRegisterState {
    username: String,
    email: String,
    password: String,
    confirmPassword: String,
    usernameError: String,
    passwordError: String,
    emailError: String,
    confirmPasswordError: String
}

interface IRegisterProps {
    mutate?: any,
    history? : any
}

interface IErrorResponse {
    path: string,
    message: string
}

class Register extends React.Component<IRegisterProps, IRegisterState> {
    state = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        usernameError: '',
        emailError: '',
        passwordError: '',
        confirmPasswordError: ''
    }

    onChangeUsername = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        this.setState({username: value});
    };

    onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        this.setState({email: value});
    };

    onChangePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        this.setState({password: value});
    };

    onChangeConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        this.setState({confirmPassword: value});
    };

    onSubmit = async(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const { username, email, password, confirmPassword } = this.state;
        
        this.setState({
            usernameError: '',
            emailError: '',
            passwordError: '',
            confirmPasswordError: ''
        });

        if(password !== confirmPassword) {
            this.setState({confirmPasswordError: "Passwords do not match!"})
            return;
        }


        const response = await this.props.mutate({
            variables: {
                username,
                email,
                password
            }
        })

        const {errors, ok} = response.data.createUser;

        if(ok) {
            this.props.history.push('/login')
        } else {
            const errorMap = new Map<String, String>();
            errors.forEach((e: IErrorResponse) => {
                errorMap.set(`${e.path}Error`, e.message);
            })
            this.setState(Object.fromEntries(errorMap));
        }
    }

    render() {

        const {username, email, password, confirmPassword, usernameError, emailError, passwordError, confirmPasswordError} = this.state;
        const errorList = [];

        if(usernameError.length > 0) errorList.push(usernameError);
        if(passwordError.length > 0) errorList.push(passwordError);
        if(emailError.length > 0) errorList.push(emailError); 
        if(confirmPasswordError.length > 0) errorList.push(confirmPasswordError);

        return (
            <div className="register-page">
                <div className="register-box">
                    <Header as="h2">
                        Register
                    </Header>
                    <Input
                        name="username"
                        onChange={this.onChangeUsername}
                        error={usernameError.length > 0}
                        value={username}
                        placeholder="Username"
                        fluid
                    />
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
                    <Input
                        name="confirmPassword"
                        type="password"
                        onChange={this.onChangeConfirmPassword}
                        error={confirmPasswordError.length > 0}
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        fluid
                    />
                    <div className="footer">
                        <div id="login-text">Already have an account?&nbsp;&nbsp;<Link to={`/login`}>Log in</Link></div>
                        <Button
                            disabled={username.length === 0 || email.length === 0 || password.length === 0 || confirmPassword.length === 0}
                            onClick={this.onSubmit}
                        >
                            Register
                        </Button>
                    </div>
                    { 
                      errorList.length > 0 ? (
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

const CREATE_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
      createUser(username: $username, email: $email, password: $password) {
          ok
          errors {
              path
              message
          }
      }
  }
`;

export default graphql<IRegisterProps, IRegisterState>(CREATE_USER)(Register);