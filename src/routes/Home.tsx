import React from 'react';
import { Redirect } from 'react-router-dom';


class Home extends React.Component {
    state = {
    }

    render() {
        return (
            <Redirect to={`/login`}></Redirect>
        )
    }
}


export default Home;