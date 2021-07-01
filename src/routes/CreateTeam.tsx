import React from 'react';
import { Message, Input, Header, Button } from 'semantic-ui-react';
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';

import './CreateTeam.css';

interface ICreateTeamState {
    name: String,
    nameError: String
}

interface ICreateTeamProps {
    mutate?: any,
    history? : any
}

interface IErrorResponse {
    path: string,
    message: string
}

class CreateTeam extends React.Component<ICreateTeamProps, ICreateTeamState> {
    state = {
        name: '',
        nameError: ''
    }

    onChangeTeamName = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        this.setState({name: value});
    };

    onSubmit = async(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.setState({
            nameError: '',
        })

        let response = null;

        try {
            response = await this.props.mutate({
              variables: { name: this.state.name }
            })
        } catch(errors) {
            this.props.history.push('/login');
            return;
        }


        const {errors, ok, team} = response.data.createTeam;

        console.log(response);

        if(ok) {
            this.props.history.push(`/main/${team.id}`)
        } else {
            const errorMap = new Map<String, String>();
            errors.forEach((e: IErrorResponse) => {
                errorMap.set(`${e.path}Error`, e.message);
            });
            this.setState(Object.fromEntries(errorMap));
        }
    }

    render() {

        const {name, nameError} = this.state;
        const errorList = [];

        if(nameError.length > 0) errorList.push(nameError);

        return (
            <div className="create-team-page">
                <div className="create-team-box">
                    <Header as="h2">
                        Create Team
                    </Header>
                    <Input
                        name="teamName"
                        onChange={this.onChangeTeamName}
                        error={nameError.length > 0}
                        value={name}
                        placeholder="Team Name"
                        fluid
                    />
                    <Button
                        onClick={this.onSubmit}
                        disabled={name.length === 0}
                    >
                        Create Team
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
                </div>
            </div>
        )
    }
}

const CREATE_TEAM = gql`
  mutation($name: String!) {
      createTeam(name: $name) {
          ok
          team {
              id
          }
          errors {
              path
              message
          }
      }
  }
`;

export default graphql<ICreateTeamProps, ICreateTeamState>(CREATE_TEAM)(CreateTeam);