import React from 'react'
import { connect } from 'react-redux'
import { fetchCamarasPatente } from '../../actions/camarasPatente'
import Page from '../../components/Page'
import SectionHeader from '../../components/SectionHeader'
import CameraSection from '../../components/CameraSection'

class CameraPatentView extends React.Component {
    componentDidMount() {
    }

    render() {
        return (
            <Page justify={'flex-start'} align={'flex-start'} withHeader withSideBar>
                <SectionHeader title={'Ver en vivo cámara de patente: ' + this.props.location.state.camera.name} />
                <CameraSection camera={this.props.location.state.camera} />
            </Page>
        )
    }
}

const mapStateToProps = ({ camaras }) => ({
    camaras
})

const mapDispatchToProps = {
    fetchCamarasPatente
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CameraPatentView)