import React from 'react'
import { fetchCamaras } from '../../actions/camaras'
import { fetchCamarasPatente, editCamaraPatente, deleteCamaraPatente, addCamaraPatente } from '../../actions/camarasPatente'
import {connect} from "react-redux";

class CameraPatentForm extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
        	updatable: false,
			id: this.props.camera.id,
            name: this.props.camera.name,
			url: this.props.camera.url,
			rtmp: this.props.camera.rtmp,
			width: this.props.camera.width,
			height: this.props.camera.height,
			id_camera: this.props.camera.id_camera,
			distance_sensor: this.props.camera.distance_sensor,
			history : this.props.history,
			cameras : this.props.cameras
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({id_camera: event.target.value});
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
			width: this.props.camera.width,
			height: this.props.camera.height,
			id_camera: this.state.id_camera,
			distance_sensor: this.props.camera.distance_sensor
		}
		if(data.id === ''){
			this.props.addCamaraPatente(data).then(() => { 
				alert('Cámara de patente agregada!');
				this.goBack();			
			})
		} else{
			this.props.editCamaraPatente(data).then(() => { 
				alert('Actualizado!');
				this.goBack();			
			})
		}

  	}
  	remove = (e) => {
		this.props.deleteCamaraPatente({id: this.state.id}).then(() => { 
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

		let options = this.state.cameras.map((d,i) => {
		return <option key={i} value={d.id}>{d.name}</option>
		});

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
				  <div className="form-group">
				  	<label htmlFor="id_camera">Cámara Seguimiento</label>
					<select name="id_camera" defaultValue={this.state.id_camera} className="form-control" id="id_camera" onChange={this.handleChange}>
						<option key={0} value="">Selecciona cámara de seguimiento</option>
						{options}
                    </select> 
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
	fetchCamarasPatente,
    editCamaraPatente,
	deleteCamaraPatente,
	addCamaraPatente
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CameraPatentForm)