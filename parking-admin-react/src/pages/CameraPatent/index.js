import React from 'react'
import { connect } from 'react-redux'
import { fetchCamaras } from '../../actions/camaras'
import { fetchCamarasPatente } from '../../actions/camarasPatente'
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

class CameraPatent extends React.Component {

	componentDidMount() {
		this.props.fetchCamaras()
		this.props.fetchCamarasPatente()
	}

	view(camera) {
		this.props.history.push({
			pathname: '/CameraPatentView',
			state: { camera: camera }
		})
	}

	edit(camera,cameras) {
		this.props.history.push({
			pathname: '/CameraPatentEdit',
			state: { 
				camera: camera,
				cameras: cameras 
			}
		})
	}

	homography(camera) {
		this.props.history.push({
			pathname: '/CameraPatentHomography',
			state: { camera: camera }
		})
	}

	add(cameras) {
		let camera = {
			id: '',
			name: 'New Camera Patent',
			url: 'http://localhost/newCamera.m3u8',
			rtmp: 'rtmp://localhost:1935/live/newCamera',
			distance_sensor : 176000,
			width: 640,
			height: 352
		}
		this.props.history.push({
			pathname: '/CameraPatentAdd',
			state: { 
				camera: camera,
				cameras: cameras 
			}
		})
	}

	getImageCameraSeguimiento(camaraIdSeguimiento,camaras) {
		let frame = ''
		for (let i = 0; i < camaras.length; i++){
			if(camaras[i].id === camaraIdSeguimiento)
				frame = camaras[i].lastFrameImageBase64
		}

		return frame
	}

	camaraList(camarasPatente,camaras) {
		let addCamera = <button className="btn btn-success" onClick={() => this.add(camaras)}>Agregar cámara patente</button>;
		let permissions = localStorage.getItem('permissions')
		if (permissions) {
			permissions = permissions.split(',');
			if (permissions.indexOf('change_camera_patent') === -1) {
				addCamera = ''
			}
		}
		return (
			<CardsContainer>
				<div className="pl-0 mb-3 container-fluid">
					{addCamera}
				</div>
				<div className="row" style={{ width: "100%"}}>
						{camarasPatente.map(c => <CardImage className="col-md-6 col-lg-6" permission1="view_patents" permission2="change_patents" permission3="change_patentes" action1="Ver en vivo" action2="Editar" action3="Configurar homografía" onClick={() => this.view(c)} onEdit={() => this.edit(c,camaras)} onConfigure={() => this.homography(c)} key={c.id} title={'Cámara de patente: ' + c.name} title2={'Cámara de seguimiento: ' + c.id_camera} content={c.url} imagedata={this.getImageCameraSeguimiento(c.id_camera,camaras)} />)}
				</div>
			</CardsContainer>
		); 
	  } 

	render() {
        return (
			<Page align='space-between' withHeader withSideBar>
				<SectionHeader title={'Cámaras de patentes de vehículos'} />
				
				{this.camaraList(this.props.camerasPatente,this.props.cameras)}
				
			</Page>
		)
	}
}

const mapStateToProps = (state) => {
	return { 
		cameras : state.camaras.data,
		camerasPatente : state.camarasPatente.data
	}
  }

const mapDispatchToProps = {
	fetchCamaras,
	fetchCamarasPatente
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
  )(CameraPatent)