import React from 'react'
import { connect } from 'react-redux'
import Page from 'components/Page';
import SectionHeader from 'components/SectionHeader'
import Card from '../../components/Card';
import styled from 'styled-components'
import {fetchTopParkings, fetchParkings} from "../../actions/parkings"
import {fetchTopVehicles} from "../../actions/patents";

const CardsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	padding: 20px 3px;
	justify-content: space-between;
`

class Home extends React.Component {
	componentDidMount() {
		this.props.fetchTopParkings(10)
		this.props.fetchTopVehicles(10)
		this.props.fetchParkings()
		//setInterval(() => { this.props.fetchParkings() }, 1000)
	}

	renderTopVehicles()
    {
		let response = this.props.patents.data
		
		const patents = response.map((patente, index) => {
            return (
                <tr key={index} className="">
                    <td>{patente.patente}</td>
                    <td>{patente.count}</td>
                </tr>
            )
        });

        return(
			
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
						<th scope="col">Patente</th>
						<th scope="col">Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {patents}
                </tbody>
            </table>
		);
		
	}

	renderParkingsOccuped(){
		let responseParkings = this.props.parkings.data
		let parkings = []

		responseParkings.forEach((parking) => {
			if(parking.isOccupied)
				parkings.push(parking)
		});

		const patents = parkings.map((patente, index) => {
			return (
				<tr key={index} className="">
					<td>{patente.cameraId}</td>
					<td>{patente.id}</td>
					<td>{patente.patent}</td>
				</tr>
			)

        });

        return(

            <table className="table table-hover">
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

	renderTopParkings()
    {
		let responseTopParkings = this.props.topParkings.data
		let responseParkings = this.props.parkings.data

		const topParkings = responseTopParkings.map((topParking, index) => {
			let camaraId = ''
			responseParkings.forEach((parking) => {
				if(parking.id === topParking.idParking)
					camaraId = parking.cameraId
			});
            return (
                <tr key={index} className="">
					<td>{camaraId}</td>
                    <td>{topParking.idParking}</td>
                    <td>{topParking.count}</td>
                </tr>
            )
        });

        return(
            		
			<table className="table table-hover">
				<thead className="thead-dark">
					<tr>
						<th scope="col">Cámara Id</th> 
						<th scope="col">Lugar</th>
						<th scope="col">Cantidad</th>
					</tr>
				</thead>
				<tbody>
					{topParkings}
				</tbody>
			</table>
		);
		
	}

	render() {
		
		return (
			<Page align='space-between' withHeader withSideBar>
				<SectionHeader title={'Tablero'} />
				<div className="row">
					<CardsContainer>
						<Card className={'col-md-4'} key={'total'} title={'Estacionamientos Habilitados'} content={this.props.parkingsResume.data.total} />
						<Card className={'col-md-4'} key={'free'} title={'Estacionamientos Libres'} content={this.props.parkingsResume.data.free} />
						<Card className={'col-md-4'} key={'ocupated'} title={'Estacionamientos Ocupados'} content={this.props.parkingsResume.data.occupated} />
					</CardsContainer>
				</div>

				<div className="container">
					<div className="row">
						<div className="col">
							<h5>Lugares ocupados</h5>
							{this.renderParkingsOccuped()}
						</div>
						<div className="col">
							<h5>Vehículos con más actividades registradas</h5>
							{this.renderTopVehicles()}
						</div>
						<div className="col">
							<h5>Lugares con más actividades registradas</h5>
							{this.renderTopParkings()}
						</div>
					</div>
				</div>
			</Page>
		)
	}
}

const mapDispatchToProps = {
	fetchTopParkings,
	fetchTopVehicles,
	fetchParkings,
}
const mapStateToProps = ({ topParkings, patents, parkings, parkingsResume }) => ({
	topParkings,
	patents,
	parkings,
	parkingsResume,
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)