import React from 'react'
import { connect } from 'react-redux'
import { fetchCamaras } from '../../actions/camaras'
import Page from '../../components/Page';
import SectionHeader from '../../components/SectionHeader'
import CardImage from '../../components/CardImage';
import styled from 'styled-components'

const CardsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	padding: 20px 3px;
	justify-content: space-between;
`

class ConfigureParkings extends React.Component {

	componentDidMount() {
		this.props.fetchCamaras()
	}

	configure(camara) {
		this.props.history.push({
			pathname: '/ConfigureParking',
			state: { camara: camara }
		})
	}

	camaraList(camaras) {
		return (
			<div className="row">
				<CardsContainer>

						{camaras.map(c => <CardImage className="col-md-6" permission1="change_parkings" action1="Configurar" onClick={() => this.configure(c)} key={c.id} title={c.name} content={c.url} imagedata={c.lastFrameImageBase64} />)}

				</CardsContainer>
				</div>
		); 
	  } 

	render() {
        return (
			<Page align='space-between' withHeader withSideBar>
				<SectionHeader title={'Configurar lugares'} />
				
				{this.camaraList(this.props.camaras)}
				
			</Page>
		)
	}
}

const mapStateToProps = (state) => {
	return { camaras : state.camaras.data }
  }

const mapDispatchToProps = {
	fetchCamaras
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
  )(ConfigureParkings)