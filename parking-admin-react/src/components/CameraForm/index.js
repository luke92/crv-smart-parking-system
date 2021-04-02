import React from 'react'
import { fetchCamaras, editCamara, deleteCamara, addCamara } from '../../actions/camaras'
import {connect} from "react-redux";

class CameraForm extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
        	updatable: false,
			id: this.props.camera.id,
            name: this.props.camera.name,
			url: this.props.camera.url,
			rtmp: this.props.camera.rtmp,
			matrix_camera_row: this.props.camera.matrix_camera_row,
			matrix_camera_column: this.props.camera.matrix_camera_column,
			history : this.props.history
        };
	}

	goBack = () => {
		this.props.history.goBack();
    };

    onTodoChange(name, value){
		let updated = {}
		updated[name] = value
        this.setState(updated);
    }

	handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			id: this.state.id,
			name: this.state.name,
			url: this.state.url,
			rtmp: this.state.rtmp,
			matrix_camera_row: this.props.camera.matrix_camera_row,
			matrix_camera_column: this.props.camera.matrix_camera_column,
			filtro_contorno : this.props.camera.filtro_contorno,
			radio_parking: this.props.camera.radio_parking,
			radio_vehiculo: this.props.camera.radio_vehiculo,
			width: this.props.camera.width,
			height: this.props.camera.height
		}
		if(data.id === ''){
			this.props.addCamara(data).then(() => { 
				alert('Cámara agregada!');
				this.goBack();			
			})
		} else{
			this.props.editCamara(data).then(() => { 
				alert('Actualizado!');
				this.goBack();			
			})
		}

  	}
  	remove = (e) => {
		this.props.deleteCamara({id: this.state.id}).then(() => { 
			alert('Borrado!');
			this.goBack();
		})
	}

	render() {
		const isNew = this.state.id === '';
		let buttonDelete;
		let buttonName;
		if (isNew) {
			buttonName = 'Agregar'
		  } else {
			buttonName = 'Actualizar'
			buttonDelete = <button type="button" onClick={this.remove} className="btn btn-danger mr-2">Eliminar</button>
		  }
		return (
			<div className="container-fluid mt-3">
				<form onSubmit={this.handleSubmit}>
				  <div className="form-group">
					  <label htmlFor="name">Nombre</label>
					  <input className="form-control" required name="name" type="text" value={this.state.name}
					  placeholder="Enter Name" onChange={e => this.onTodoChange(e.target.name, e.target.value)}/>
				  </div>
				  <div className="form-group">
					  <label htmlFor="url">URL</label>
					  <input className="form-control" required name="url" type="text" value={this.state.url}
					  placeholder="Enter Url" onChange={e => this.onTodoChange(e.target.name, e.target.value)}/>
				  </div>
				  <div className="form-group">
					  <label htmlFor="url">RTMP</label>
					  <input className="form-control" required name="rtmp" type="text" value={this.state.rtmp}
					  placeholder="Enter RTMP" onChange={e => this.onTodoChange(e.target.name, e.target.value)}/>
				  </div>
					{buttonDelete}
					<button type="submit" className="btn btn-primary mr-2">{buttonName}</button>
					<button type="button" onClick={this.goBack} className="btn btn-warning mr-2">Cancelar</button>
				</form>
			</div>
		)
	}
}
const mapStateToProps = ({ camaras }) => ({
    camaras
})

const mapDispatchToProps = {
    fetchCamaras,
    editCamara,
	deleteCamara,
	addCamara
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CameraForm)