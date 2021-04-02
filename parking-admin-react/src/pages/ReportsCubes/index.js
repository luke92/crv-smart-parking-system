import React from 'react'
import { connect } from 'react-redux'
import { fetchReports } from '../../actions/reports'
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

class ReportsCubes extends React.Component {

	componentDidMount() {
		this.props.fetchReports()
	}

	view(report) {
		this.props.history.push({
			pathname: '/reportCubeView',
			state: { report: report }
		})
	}

	edit(report) {
		this.props.history.push({
			pathname: '/reportCubeEdit',
			state: { 
				report: report
			}
		})
	}

	add(reports) {
		let report = {
			id: '',
			name: 'New Report Cube',
			description: 'Description of New Report',
            url: 'http://crv-metabase.herokuapp.com/public/dashboard/c7b5d502-f92e-4b65-968f-ce7ecdc92579',
            active: true
		}
		this.props.history.push({
			pathname: '/reportCubeAdd',
			state: { 
				report: report,
			}
		})
	}

	getImageChart(isPie) {
		return 'data:image/png;base64,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'
	}

	reportList(reports) {
		return (
			<CardsContainer>
				<div className="pl-0 mb-3 container-fluid">
					<button className="btn btn-success" onClick={() => this.add(reports)}>Agregar reporte de cubo</button>
				</div>
				<div className="row">
				{reports.map(report => report.active && <CardImage className="col-md-6" action1="Ver reporte" action2="Editar origen" onClick={() => this.view(report)} onEdit={() => this.edit(report)} key={report.id} title={report.name} title2={report.description} imagedata={this.getImageChart(true)} />)}
				</div>
			</CardsContainer>
		); 
	  } 

	render() {
        return (
			<Page align='space-between' withHeader withSideBar>
				<SectionHeader title={'Reportes de cubo'} />
				
				{this.reportList(this.props.reports)}
				
			</Page>
		)
	}
}

const mapStateToProps = (state) => {
	return { 
		reports : state.reports.data,
	}
  }

const mapDispatchToProps = {
	fetchReports
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
  )(ReportsCubes)