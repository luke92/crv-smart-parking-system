import React from 'react'
import { connect } from 'react-redux'
import { fetchCamarasPatente, editCamaraPatente } from '../../actions/camarasPatente'
import { fetchCamaras } from '../../actions/camaras'
import Page from '../../components/Page'
import SectionHeader from '../../components/SectionHeader'
import CameraPatentForm from "../../components/CameraPatentForm"

class CameraPatentEdit extends React.Component {
    render() {
        return (
            <Page justify={'flex-start'} align={'flex-start'} withHeader withSideBar>
                <SectionHeader title={'Editar cámara de patente: ' + this.props.location.state.camera.name} />
                <CameraPatentForm cameras={this.props.location.state.cameras} camera={this.props.location.state.camera} history={this.props.history} />
            </Page>
        )
    }
}

const mapStateToProps = ({ camaras }) => ({
    camaras
})

const mapDispatchToProps = {
    fetchCamaras,
    editCamaraPatente,
    fetchCamarasPatente
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CameraPatentEdit)