import React from 'react';
import { Message, Input, Container, Header, Button } from 'semantic-ui-react';
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';

import './Register.css';

interface IRegisterState {
    username: String,
    email: String,
    password: String
    usernameError: String,
    passwordError: String,
    emailError: String
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
        usernameError: '',
        emailError: '',
        passwordError: ''
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

    onSubmit = async(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.setState({
            usernameError: '',
            emailError: '',
            passwordError: ''
        })

        const { username, email, password } = this.state;

        const response = await this.props.mutate({
            variables: {
                username,
                email,
                password
            }
        })

        const {errors, ok} = response.data.createUser;

        console.log(response);

        if(ok) {
            this.props.history.push('/login')
        } else {
            const errorMap = new Map<String, String>();
            errors.forEach((e: IErrorResponse) => {
                errorMap.set(`${e.path}Error`, e.message);
            });
            this.setState(Object.fromEntries(errorMap));
        }
    }

    render() {

        const {username, email, password, usernameError, emailError, passwordError} = this.state;
        const errorList = [];

        if(usernameError.length > 0) errorList.push(usernameError);
        if(passwordError.length > 0) errorList.push(passwordError);
        if(emailError.length > 0) errorList.push(emailError); 

        return (
            <Container text>
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
                <Button
                    onClick={this.onSubmit}
                >
                    Register
                </Button>
                { errorList.length > 0 ? (
                    <Message
                    error
                    header="There was an issue with your submission"
                    list={errorList}
                    >
                    </Message>
                ) : null
                }
            </Container>
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