import React from 'react'
import Page from '../../components/Page'
import SectionHeader from '../../components/SectionHeader'
import ReportEmbed from '../../components/ReportEmbed'

class ReportCubeView extends React.Component {

    render() {
        return (
            <Page justify={'flex-start'} align={'flex-start'} withHeader withSideBar>
                <SectionHeader title={'Reporte cubo ' + this.props.location.state.report.name} />
                <ReportEmbed report={this.props.location.state.report} />
            </Page>
        )
    }
}


export default (ReportCubeView)