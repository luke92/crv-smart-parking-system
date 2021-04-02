import React from 'react'
import { connect } from 'react-redux'
import { fetchUsers, addUser, editUser, fetchGroups  } from '../../actions/users'

class UserModal extends React.Component {
    
    constructor(props) {
        super(props);
        this.setState({
            id: this.props.user.id,
            username: this.props.user.username,
            password: this.props.user.password,
            group: this.props.user.group,
            history : this.props.history
        })
        this.guardarCambios = this.guardarCambios.bind(this);
    }

    componentWillReceiveProps() {
        this.setState({
            id: this.props.user.id,
            username: this.props.user.username,
            password: this.props.user.password,
            group: this.props.user.group
        });
    }
    
    usernameHandler(e) {
        this.props.user.username = e.target.value;
        this.setState({ username: e.target.value });
        if (this.props.user.password !== '') {
            document.getElementById('save-changes').removeAttribute('disabled');
        } else {
            document.getElementById('save-changes').setAttribute('disabled', 'disabled');
        }
    }

    passwordHandler(e) {
        let pass = e.target.value.trim();
        this.props.user.password = pass;
        this.setState({ password: pass });
        if (this.props.user.username !== '') {
            document.getElementById('save-changes').removeAttribute('disabled');
        } else {
            document.getElementById('save-changes').setAttribute('disabled', 'disabled');
        }
    }

    goBack = () => {
		this.props.history.goBack();
    };

    guardarCambios(e) {
        e.preventDefault()
        var group = document.getElementById("group").value;
        let new_user = {
            id: this.props.user.id,
            groups : [group],
            username : this.props.user.username,
            password : this.props.user.password
        }
        if(new_user.id === ''){
            this.props.addUser(new_user).then(() => {
                alert('Usuario guardado!')
                this.goBack()
            }).catch(error => {
                alert('ERROR: '+error);
            })
        }
        else{
            this.props.editUser(new_user).then(() => {
                alert('Usuario actualizado!')
            }).catch(error => {
                alert('ERROR: '+error);
            })
        }
        
        this.props.updateUsers()
    }

	render() {
        let isEdit = this.props.user.ud !== '';
        let defaultGroup = isEdit ? this.props.user.groups[0] : '';
        const groups = this.props.groups.data.map((group, index) => {
            	return ( <option value={group.id}>{group.name} </option>)
			})
        return (           
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog  modal-dialog-centered modal-md" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel"><strong>{this.props.title}</strong></h5>
                             <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            
                        </div>
                            <div className="modal-body">
                                <p><span className="modal-label">Rol:</span></p>
                                <select defaultValue={defaultGroup} className="form-control" id="group">
                                    {groups}
                                </select>
                                <p></p>
                                <p><span className="modal-label">Usuario:</span><input id="username" required="required" value={this.props.user.username}   onChange={(e) => this.usernameHandler(e)} className="form-control"/></p>
                                <p><span className="modal-label">Clave:</span><input id="password" required="required" type="password" value={this.props.user.password} onChange={(e) => this.passwordHandler(e)} className="form-control"/></p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button id="save-changes" type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e) =>  this.guardarCambios(e) }>Guardar cambios</button>
                            </div>
                    </div>
                </div>
            </div>
		)
    }
    
}

const mapStateToProps = ({ users, groups }) => ({
	users,
    groups
})

const mapDispatchToProps = {
    addUser,
    editUser,
    fetchUsers
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
  ) (UserModal)