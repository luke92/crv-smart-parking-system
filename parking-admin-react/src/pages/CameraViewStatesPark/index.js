import React from 'react'
import { connect } from 'react-redux'
import { fetchParkings } from '../../actions/parkings'
import Page from '../../components/Page'
import SectionHeader from '../../components/SectionHeader'

class CameraViewStatesPark extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state.camera.id,
            width: this.props.location.state.camera.width,
            height: this.props.location.state.camera.height,
            img: this.props.location.state.camera.lastFrameDrawImg64,
            cantTotal: 0,
            cantOcupados: 0,
            cantLibres: 0
        }
    }

    componentDidMount() {
        this.props.fetchParkings()
        //setInterval(() => { this.contabilizarOcupadosDesocupados() }, 1000)
        this.contabilizarOcupadosDesocupados()
    }

    contabilizarOcupadosDesocupados()
    {
        let response = this.props.parkings.data
        var cantTotal = 0
        var cantOcupados = 0
        var cantLibres = 0
        for (let i = 0; i < response.length; i++) {
            if (response[i].cameraId===this.state.id)
            {
                cantTotal=cantTotal+1
                if(response[i].isOccupied)
                    cantOcupados=cantOcupados+1
                else
                    cantLibres=cantLibres+1
            }
        }
        this.setState( { cantTotal: cantTotal, cantOcupados: cantOcupados, cantLibres: cantLibres } )
    }

    renderParkingsOccuped(){
		let responseParkings = this.props.parkings.data
		let parkings = []
		
		responseParkings.forEach((parking) => {
			if(parking.isOccupied && parking.cameraId === this.state.id)
				parkings.push(parking)
		});
		
		const patents = parkings.map((patente, index) => {
			return (
				<tr key={index} className="table-success">
					<td>{patente.cameraId}</td>
					<td>{patente.id}</td>
					<td>{patente.patent}</td>
				</tr>
			)		
            
        });

        return(
			
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
						<th scope="col">Cámara Id</th>
						<th scope="col">Lugar</th>
						<th scope="col">Patente</th>
                    </tr>
                </thead>
                <tbody>
                    {patents}
                </tbody>
            </table>
		);
	}

    render() {
        let image      
        image = <img id="cameraImage" alt="Camara" width={this.state.width} height={this.state.height} src={this.state.img} />
        
        return (
            <Page justify={'flex-start'} align={'flex-start'} withHeader withSideBar>
                <SectionHeader title={'Estado del estacionamiento en cámara de seguimiento: ' + this.props.location.state.camera.name} />
                <div className="row" style={{marginTop: "15px"}}>
                    <div className="col-md-6" style={{paddingTop: "20px", paddingLeft: "40px"}}>
                        <h5><strong style={{color: "black"}}>Total: {this.state.cantTotal}</strong></h5>
                        <h5><strong style={{color: "red"}}>Ocupados: {this.state.cantOcupados}</strong></h5>
                        <h5><strong style={{color: "green"}}>Libres: {this.state.cantLibres}</strong></h5>
                    </div>
                    <div className="col-md-6">
                        {image}
                    </div>
                    <div className="col-md-6">
						<h4>Lugares ocupados</h4>
						{this.renderParkingsOccuped()}
					</div>
                </div>
            </Page>
        )
    }
}

const mapDispatchToProps = {
    fetchParkings
}

const mapStateToProps = ({ parkings, parking }) => ({
	parkings,
	parking
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(CameraViewStatesPark)