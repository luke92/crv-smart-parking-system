import React from 'react'
import Page from '../../components/Page'
import SectionHeader from '../../components/SectionHeader'
import ReportForm from "../../components/ReportForm"

class ReportCubeEdit extends React.Component {
    render() {
        return (
            <Page justify={'flex-start'} align={'flex-start'} withHeader withSideBar>
                <SectionHeader title={'Editar Reporte ' + this.props.location.state.report.name} />
                <ReportForm  report={this.props.location.state.report} history={this.props.history} />
            </Page>
        )
    }
}

export default (ReportCubeEdit)