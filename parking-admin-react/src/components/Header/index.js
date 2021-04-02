import React from 'react'
import styled from 'styled-components'
import LoginForm from '../LoginForm';
import SignupForm from '../SingupForm';
import Nav from '../Nav';
import { withRouter } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import apiRoutes from '../../constants/apiRoutes';
import api from '../../services/api'

const HeaderContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding: 10px 20px;
	width: 100%;
	height: 70px;
	-webkit-box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.2);
	-moz-box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.2);
	box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.2);
`

const Title = styled.label`
	font-family: ${({ theme }) => theme.fonts.roboto};
	font-weight: 500;
	font-size: 22px;
	color: ${({ theme }) => theme.colors.blue};
`

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  displayed_form: '',
		  logged_in: !!localStorage.getItem('token'),
		  username: localStorage.getItem('username') ? localStorage.getItem('username') : ''
		};
	  }

	  componentDidMount() {
		if (this.state.logged_in) {
			/*api.get(`${apiRoutes.CURRENTUSERJSON}`)
			.then(response => {
				console.log(response.data);
			  })
			  .catch(error => {
				console.log(error);
			  });*/
			  /*
		  fetch(`${CONFIG.API_BASE_URL}${apiRoutes.CURRENTUSER}`, {
				headers: {
					'Access-Control-Allow-Origin' : '*',
    				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
			  		'Authorization': `JWT ${localStorage.getItem('token')}`
				}
			  })
			  .then((response) => {
				if (response.ok) {
					console.log(response)
				  return response.json();
				} else {
				  throw new Error('Something went wrong');
				}
			  })
			  .then((responseJson) => {
				console.log(responseJson)
			  })
			  .catch((error) => {
				console.log(error)
			  });
			//this.setState({ username: json.username });
		}
		else {
			this.handle_logout()
		}*/
	  }
	}
	  

	  handle_signup = (e, data) => {
		e.preventDefault();
		/*
		fetch(`${CONFIG.API_BASE_URL}${apiRoutes.USERS}`, {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(data)
		})
		  .then(res => res.json())
		  .then(json => {
			localStorage.setItem('token', json.token);
			this.setState({
			  logged_in: true,
			  displayed_form: '',
			  username: json.username
			});
		  });
		  */
	  };

	  handle_logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('username');
		localStorage.removeItem('permission');
		this.setState({ logged_in: false, username: '' });
		this.goToLogin();
	  };

	  display_form = form => {
		this.setState({
		  displayed_form: form
		});
	  };

	  goToLogin(){
		this.props.history.push('/login');
	  }

	render() {
		let form;
		switch (this.state.displayed_form) {
		  case 'login':
			form = <LoginForm handle_login={this.handle_login} />;
			break;
		  case 'signup':
			form = <SignupForm handle_signup={this.handle_signup} />;
			break;
		  default:
			form = null;
		}

		return (
			<HeaderContainer>
				<div className="col-md-6">
					<Title className="mt-2">
						<FontAwesomeIcon color="black" icon={['fa', 'car']} size="md" className="mr-2" />
						{'Administrador de estacionamiento'}
					</Title>
				</div>
				<div className="col-md-6 text-right mt-2">
					<Nav
				  logged_in={this.state.logged_in}
				  display_name={this.state.username}
				  display_form={this.display_form}
				  handle_logout={this.handle_logout}
				/>
				</div>

				{form}
			</HeaderContainer>
		)
	}
}

export default withRouter(Header)