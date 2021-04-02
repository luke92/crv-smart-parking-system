import React from 'react'
import { fetchReports, editReport, deleteReport, addReport } from '../../actions/reports'
import {connect} from "react-redux";

class ReportForm extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
        	updatable: false,
			id: this.props.report.id,
            name: this.props.report.name,
			url: this.props.report.url,
			description: this.props.report.description,
			active: this.props.report.active,
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
			description: this.state.description,
			active: this.state.active,
		}
		if(data.id === ''){
			this.props.addReport(data).then(() => { 
				alert('Reporte agregado!');
				this.goBack();			
			})
		} else{
			this.props.editReport(data).then(() => { 
				alert('Reporte Actualizado!');
				this.goBack();			
			})
		}
	  }
	  
  	remove = (e) => {
		const data = {
            id: this.state.id,
            name: this.state.name,
			url: this.state.url,
			description: this.state.description,
			active: false,
		}
		this.props.editReport(data).then(() => { 
			alert('Reporte Borrado!');
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
					  <label htmlFor="name">Descripción</label>
					  <input className="form-control" required name="description" type="text" value={this.state.description}
					  placeholder="Enter Description" onChange={e => this.onTodoChange(e.target.name, e.target.value)}/>
				  </div>
				  <div className="form-group">
					  <label htmlFor="url">URL</label>
					  <input className="form-control" required name="url" type="text" value={this.state.url}
					  placeholder="Enter Url" onChange={e => this.onTodoChange(e.target.name, e.target.value)}/>
				  </div>
					{buttonDelete}
					<button type="submit" className="btn btn-primary mr-2">{buttonName}</button>
					<button type="button" onClick={this.goBack} className="btn btn-warning mr-2">Cancelar</button>
				</form>
			</div>
		)
	}
}
const mapStateToProps = ({ reports }) => ({
    reports
})

const mapDispatchToProps = {
	fetchReports,
    editReport,
	deleteReport,
	addReport
}

export default connect(
	mapStateToProps,
    mapDispatchToProps
)(ReportForm)