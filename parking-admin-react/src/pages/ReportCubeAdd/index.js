import React from 'react'
import Page from '../../components/Page'
import SectionHeader from '../../components/SectionHeader'
import ReportForm from "../../components/ReportForm"

class ReportCubeAdd extends React.Component {
    render() {
        return (
            <Page justify={'flex-start'} align={'flex-start'} withHeader withSideBar>
                <SectionHeader title='Agregar nuevo reporte' />
                <ReportForm report={this.props.location.state.report} history={this.props.history} />
            </Page>
        )
    }
}

export default (ReportCubeAdd)