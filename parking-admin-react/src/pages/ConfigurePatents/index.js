import React from 'react'
import { connect } from 'react-redux'
import { fetchPatents, deletePatent, addPatent  } from '../../actions/patents'
import Page from '../../components/Page';
import SectionHeader from '../../components/SectionHeader';
import PatentModal from '../../components/PatentModal';

class ConfigurePatents extends React.Component {

    constructor(props) {
        super(props);    
		this.updatePatents = this.updatePatents.bind(this);
		this.state = {
			title: 'Crear Patente',
			patent: {
				id: '',
				tipo: '',
				nomenclatura: '',
				descripcion: ''
			}
		}
    }

	componentDidMount() {
		this.props.fetchPatents()
	}

	updatePatents() {
		this.props.fetchPatents()
		alert('Nomenclatura de Patente guardada!')
		this.props.history.goBack();
    }

	borrarPatent(idPatent)
    {
		if (!window.confirm("¿Desea borrar el estacionamiento?")) return;
		this.props.deletePatent(idPatent);
		this.props.fetchPatents()
		this.props.history.goBack();
	}

	editarPatent(patent)
    {
		this.setState({
			title: 'Editar Patente',
			patent: patent
		})
	}

	crearPatent() 
	{
		this.setState({
			title: 'Crear Patente',
			patent: {
				id: '',
				tipo: '',
				nomenclatura: '',
				descripcion: ''
			}
		})
	}

    renderPatents()
    {
        let response = this.props.patents.data
	
		const patents = response.map((patent, index) => {
            return (
                <tr key={index}>
                    <td>{patent.tipo}</td>
                    <td>{patent.nomenclatura}</td>
                    <td>{patent.descripcion}</td>
					<td>
					<button data-toggle="modal" data-target="#exampleModal" type="button" className="btn btn-primary" onClick={() => this.editarPatent(patent)}>Editar</button>
					</td>
                    <td>
						<button type="button" className="btn btn-danger" onClick={() => this.borrarPatent(patent.id)}>Borrar</button>
					</td>
                </tr>
            )
        });

        return(
            <div className="mt-4 mb-3" style={{ height: "50vh", overflowY: "auto", border: "1px solid black"}} >
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
						<th scope="col">Tipo</th>
						<th scope="col">Nomenclatura</th>
						<th scope="col">Descripción</th>
						<th scope="col">Editar</th>
						<th scope="col">Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {patents}
                </tbody>
            </table>
            </div>
		);
		
	}

	render() {
		const title = this.state.title
		const patent = this.state.patent
		const createButton = <button type="button" className="btn btn-success mt-3 mb-3" data-toggle="modal" data-target="#exampleModal" onClick={this.crearPatent.bind(this)}>Crear Patente</button>
        return (
			<Page align='space-between' withHeader withSideBar>
				<SectionHeader title={'Configurar patentes admitidas'} />
				{ this.renderPatents() }

				{createButton}

				<PatentModal
					title={title}
					updatePatents={this.updatePatents}
					patent={patent}
				/>

			</Page>
		)
	}
}

const mapStateToProps = ({ patents }) => ({
	patents
})

const mapDispatchToProps = {
	fetchPatents,
	deletePatent,
	addPatent
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
  ) (ConfigurePatents)