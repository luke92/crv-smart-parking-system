import React from 'react'
import { connect } from 'react-redux'
import { fetchPatents, addPatent, editPatent  } from '../../actions/patents'

class PatentModal extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.patent.id,
            tipo: this.props.patent.tipo,
            nomenclatura: this.props.patent.nomenclatura,
            descripcion: this.props.patent.descripcion
        }
        this.guardarCambios = this.guardarCambios.bind(this);
    }

    componentWillReceiveProps() {
        this.setState({
            id: this.props.patent.id,
            tipo: this.props.patent.tipo,
            nomenclatura: this.props.patent.nomenclatura,
            descripcion: this.props.patent.descripcion
        });
    }
    
    nomenclatureHandler(e) {
        this.props.patent.nomenclatura = e.target.value;
        this.setState({ nomenclatura: e.target.value });
    }

    descriptionHandler(e) {
        this.props.patent.descripcion = e.target.value;
        this.setState({ descripcion: e.target.value });
    }

    guardarCambios() {
        var type = document.getElementById("tipo").value;
        let new_parking = {
            id: this.props.patent.id,
            tipo : type,
            nomenclatura : this.props.patent.nomenclatura,
            descripcion : this.props.patent.descripcion
        }
        if(new_parking.id === ''){
            this.props.addPatent(new_parking)
        }
        else{
            this.props.editPatent(new_parking)
        }
        
        this.props.updatePatents()
    }

	render() {
        return (           
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog  modal-dialog-centered modal-sm" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel"><strong>{this.props.title}</strong></h5>
                             <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            
                        </div>
                        <div className="modal-body">
                            <p><span className="modal-label">Tipo:</span></p>
                            <select defaultValue={this.props.patent.tipo} className="form-control" id="tipo">
                                <option>Vehículo</option>
                            </select>
                            <p></p>
                            <p><span className="modal-label">Nomenclatura:</span><input id="nomenclatura" value={this.props.patent.nomenclatura} placeholder="Ej. [A-Z]{2}[0-9]{3}[A-Z]{2} " onChange={(e) => this.nomenclatureHandler(e)} className="form-control"/></p>
                            <p><span className="modal-label">Descripción:</span><input id="descripcion" value={this.props.patent.descripcion} placeholder="Ej. patentes tipo AA999AA. Arg." onChange={(e) => this.descriptionHandler(e)} className="form-control"/></p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => { this.guardarCambios() }}>Guardar cambios</button>
                        </div>
                    </div>
                </div>
            </div>
		)
    }
    
}

const mapStateToProps = ({ patents }) => ({
	patents
})

const mapDispatchToProps = {
    addPatent,
    editPatent,
    fetchPatents
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
  ) (PatentModal)