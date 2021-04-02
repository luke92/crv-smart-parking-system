import React from 'react'
import { connect } from 'react-redux'
import { fetchCamaras, editCamara } from '../../actions/camaras'
import Page from '../../components/Page'
import SectionHeader from '../../components/SectionHeader'
import CameraForm from "../../components/CameraForm"

class CameraAdd extends React.Component {
    render() {
        return (
            <Page justify={'flex-start'} align={'flex-start'} withHeader withSideBar>
                <SectionHeader title='Agregar nueva cámara de seguimiento' />
                <CameraForm camera={this.props.location.state.camera} history={this.props.history} />
            </Page>
        )
    }
}

const mapStateToProps = ({ camaras }) => ({
    camaras
})

const mapDispatchToProps = {
    fetchCamaras,
    editCamara
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CameraAdd)