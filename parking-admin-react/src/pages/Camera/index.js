import React from 'react'
import { connect } from 'react-redux'
import { fetchCamaras } from '../../actions/camaras'
import Page from '../../components/Page';
import SectionHeader from '../../components/SectionHeader'
import CardImage from '../../components/CardImage'
import styled from 'styled-components'

const CardsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	padding: 20px 3px;
	justify-content: space-between;
`

class Camera extends React.Component {

	componentDidMount() {
		this.props.fetchCamaras()
	}

	view(camera) {
		this.props.history.push({
			pathname: '/CameraView',
			state: { camera: camera }
		})
	}

	edit(camera) {
		this.props.history.push({
			pathname: '/CameraEdit',
			state: { camera: camera }
		})
	}

	homography(camera) {
		this.props.history.push({
			pathname: '/CameraHomography',
			state: { camera: camera }
		})
	}

	viewStates(camera) {
		this.props.history.push({
			pathname: '/CameraViewStatesPark',
			state: { camera: camera }
		})
	}

	sort(cameras) {
		this.props.history.push({
			pathname: '/CameraSort',
			state: { cameras: cameras }
		})
	}

	add(cameras) {
		let camera = {
			id: '',
			name: 'New Camera',
			url: 'http://localhost/newCamera.m3u8',
			rtmp: 'rtmp://localhost:1935/live/newCamera',
			matrix_camera_row: cameras.length,
			matrix_camera_column: cameras.length,
			filtro_contorno : 1500,
			radio_parking: 15,
			radio_vehiculo: 35,
			width: 400,
			height: 350
		}
		this.props.history.push({
			pathname: '/CameraAdd',
			state: { 
				camera: camera 
			}
		})
	}

	camaraList(camaras) {
		let sortCameras = <button className="btn btn-primary mr-2 mb-2" onClick={() => this.sort(camaras)}>Ordenar cámaras</button>;
		let addCamera = <button className="btn btn-success mr-2 mb-2" onClick={() => this.add(camaras)}>Agregar cámara</button>;
		let permissions = localStorage.getItem('permissions')
		if (permissions) {
			permissions = permissions.split(',');
			if (permissions.indexOf('change_camaras') === -1) {
				sortCameras = ''
				addCamera = ''
			}
		}
		return (

			<CardsContainer>
				<div className="pl-0 mb-3 container-fluid">
					<div className="">
						{sortCameras}
						{addCamera}

					</div>
				</div>
				<div className="row">
					{camaras.map(c => <CardImage className={'col-md-6'} action1="Ver en vivo" permission1="view_camaras" permission2="change_camaras" permission3="change_camaras" permission4="view_parkings" action2="Editar" action3="Configurar homografía" action4="Ver estado del estacionamiento" onClick={() => this.view(c)} onEdit={() => this.edit(c)} onConfigure={() => this.homography(c)} onViewStates={() => this.viewStates(c)} key={c.id} title={c.name} content={c.url} imagedata={c.lastFrameDrawImg64} />)}
				</div>
			</CardsContainer>
		);
	  } 

	render() {
        return (
			<Page align='space-between' withHeader withSideBar>
				<SectionHeader title={'Cámaras de seguimiento de vehículos'} />
				
				{this.camaraList(this.props.cameras)}
				
			</Page>
		)
	}
}

const mapStateToProps = (state) => {
	return { cameras : state.camaras.data }
  }

const mapDispatchToProps = {
	fetchCamaras
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
  )(Camera)