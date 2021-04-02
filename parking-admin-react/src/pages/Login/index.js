import React from 'react'
import LoginForm from "../../components/LoginForm";
import Page from "../../components/Page";
import './Login.css';

class Login extends React.Component{
    render() {
        return(
            <Page align='space-between'>
                <div id="loginFormContainer" className="text-center">
                    <LoginForm />
                </div>

			</Page>
        )
    }
}

export default Login