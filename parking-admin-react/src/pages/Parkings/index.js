import React from 'react'
import { connect } from 'react-redux'
import { fetchParkings, editParking } from 'actions/parkings'
import { fetchConfiguration } from 'actions/configuration'
import Page from 'components/Page'
import ParkingsCanvas from 'components/ParkingsCanvas'
import SectionHeader from 'components/SectionHeader'

class Parkings extends React.Component {
	componentDidMount() {
		this.props.fetchConfiguration()
		this.props.fetchParkings()
	}

	render() {
		return (
			<Page justify={'flex-start'} align={'flex-start'} withHeader withSideBar>
				<SectionHeader title={'Estado en vivo del estacionamiento'} />
				{
					this.props.configurations.data &&
					this.props.parkings.data &&
					<ParkingsCanvas
						parkings={this.props.parkings.data}
						editParking={this.props.editParking}
						width={this.props.configurations.data.width}
						height={this.props.configurations.data.height}
					/>
				}
			</Page>
		)
	}
}

const mapStateToProps = ({ parkings, parkingsRequest, configurations }) => ({
	parkings,
	parkingsRequest,
	configurations
})

const mapDispatchToProps = {
	fetchParkings,
	editParking,
	fetchConfiguration
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Parkings)