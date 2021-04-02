import React from 'react'

class AuditModal extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            detalle: this.props.detalle
        }
    }

	render() {
        return (           
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog  modal-dialog-centered modal-sm" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel" style={{ color:"Black" }}><strong>Detalle</strong></h5>
                             <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            
                        </div>
                        <div className="modal-body">
                            <p><span className="modal-label"></span><textarea id="detail" defaultValue={this.props.detalle} className="form-control"/></p>
                            </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
		)
    }
    
}

export default AuditModal