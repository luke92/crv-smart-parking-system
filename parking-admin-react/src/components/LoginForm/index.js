import React from 'react';
import {handleLogin} from "../../actions/authentication";
import {connect} from "react-redux";
import { withRouter } from 'react-router'

class LoginForm extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
		  displayed_form: '',
		  logged_in: !!localStorage.getItem('token'),
		  username: '',
            password: ''
		};
	  }


    handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  handle_login = (e, data) => {
    e.preventDefault();
    this.props.handleLogin(data).then(() => {
        if (this.props.authentication.success) {
          let response = this.props.authentication.data;
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.user.username);
          localStorage.setItem('permissions', response.user.user_permissions);
          this.props.history.push('/home');
        } else{
            alert('Credenciales inválidas')
        }
      }        
    ).catch(() => {
      alert('Error en el sistema')
    });
  };

  render() {
    return (
      <form className="form-signin" onSubmit={e => this.handle_login(e, this.state)}>
          <img className="mb-4" src="/logo.png" alt="" width="100" />
              <h2 className="h3 mb-3">Ingresar</h2>
              <label htmlFor="usernmame" className="sr-only">Username</label>
              <input type="text"
          name="username"
          value={this.state.username}
          onChange={this.handle_change} id="usernmame" className="form-control" placeholder="Usuario" required="required"
                     autoFocus=""/>
                  <label htmlFor="inputPassword" className="sr-only">Password</label>
                  <input type="password"
          name="password"
          value={this.state.password}
          onChange={this.handle_change} id="password" className="form-control" placeholder="Clave" required="required"/>
                      <input className="btn btn-lg btn-primary btn-block" type="submit" />
          <p className="mt-5 mb-3 text-muted">© CRV Smart Parking System - 2020</p>
      </form>
    );
  }
}

const mapStateToProps = ({ authentication }) => ({
	authentication
})

const mapDispatchToProps = {
	handleLogin
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps,
  )(LoginForm))