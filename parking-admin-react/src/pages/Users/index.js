import React from 'react'
import { connect } from 'react-redux'
import {fetchUsers, deleteUser, addUser, fetchGroups} from '../../actions/users'
import Page from '../../components/Page';
import SectionHeader from '../../components/SectionHeader';
import UserModal from "../../components/UserModal";
import {groups} from "../../reducers/users";

class Users extends React.Component {

    constructor(props) {
        super(props);    
		this.updateUsers = this.updateUsers.bind(this);
		this.state = {
			title: 'Crear Usuario',
			user: {
				id: '',
				username: '',
				password: '',
				groups: ''
			}
		}
	}
	
	goBack = () => {
		this.props.history.goBack();
    };

	componentDidMount() {
		this.props.fetchUsers()
		this.props.fetchGroups()
	}

	updateUsers() {
		this.props.fetchUsers()
		//alert('Usuario guardada!')
		//this.props.history.goBack();
    }

	borrarUser(idUser)
    {
		if (!window.confirm("¿Desea borrar el usuario?")) return;
		this.props.deleteUser(idUser);
		this.goBack();
	}

	editarUser(user)
    {
		this.setState({
			title: 'Editar Usuario',
			user: user
		})
		document.getElementById("username").setAttribute('disabled','disabled')
		document.getElementById('save-changes').setAttribute('disabled', 'disabled');
	}

	crearUser()
	{
		this.setState({
			title: 'Crear Usuario',
			user: {
				id: '',
				username: '',
				password: '',
				groups: '',
				history : this.props.history
			}
		})
		document.getElementById("username").removeAttribute('disabled')
		document.getElementById('save-changes').setAttribute('disabled', 'disabled');
	}

    renderUsers()
    {
        let response = this.props.users.data
	
		const users = response.map((user, index) => {
            const groups = user.customgroups.map((group, index) => {
            	return ( <span>{group.name} </span>)
			})
			return (
                <tr key={index}>
                    <td>{user.username}</td>
                    <td>{groups}</td>
					<td>
					<button data-toggle="modal" data-target="#exampleModal" type="button" className="btn btn-primary" onClick={() => this.editarUser(user)}>Editar</button>
					</td>
                    <td>
						<button type="button" className="btn btn-danger" onClick={() => this.borrarUser(user.id)}>Borrar</button>
					</td>
                </tr>
            )
        });

        return(
            <div className="mt-4 mb-3" style={{ height: "50vh", overflowY: "auto", border: "1px solid black"}} >
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
						<th scope="col">Usuario</th>
						<th scope="col">Rol</th>
						<th scope="col">Editar</th>
						<th scope="col">Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {users}
                </tbody>
            </table>
            </div>
		);
		
	}

	render() {
		const title = this.state.title
		const user = this.state.user
		const createButton = <button type="button" className="btn btn-success mt-3" data-toggle="modal" data-target="#exampleModal" onClick={this.crearUser.bind(this)}>Crear Usuario</button>
        return (
			<Page align='space-between' withHeader withSideBar>
				<SectionHeader title={'Administrar usuarios'} />
				{ this.renderUsers() }

				{createButton}

				<UserModal
					title={title}
					updateUsers={this.updateUsers}
					user={user}
					history={this.props.history}
				/>

			</Page>
		)
	}
}

const mapStateToProps = ({ users, groups }) => ({
	users,
	groups
})

const mapDispatchToProps = {
	fetchUsers,
	fetchGroups,
	deleteUser,
	addUser
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
  ) (Users)