import React from 'react'
import { connect } from 'react-redux'
import { fetchCamaras } from '../../actions/camaras'
import Page from '../../components/Page'
import SectionHeader from '../../components/SectionHeader'
import CameraSection from '../../components/CameraSection'

class CameraView extends React.Component {
    componentDidMount() {
    }

    render() {
        return (
            <Page justify={'flex-start'} align={'flex-start'} withHeader withSideBar>
                <SectionHeader title={'Ver en vivo cámara de seguimiento: ' + this.props.location.state.camera.name} />
                <CameraSection camera={this.props.location.state.camera} />
            </Page>
        )
    }
}

const mapStateToProps = ({ camaras }) => ({
    camaras
})

const mapDispatchToProps = {
    fetchCamaras
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CameraView)