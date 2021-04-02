import React from 'react'
import { connect } from 'react-redux'
import { editCamara } from 'actions/camaras'
import Page from 'components/Page'
import SectionHeader from 'components/SectionHeader'
import CameraTable from "../../components/CameraTable";

class CameraSort extends React.Component {

    goBack = () => {
        this.props.history.push('/camera');
    };
      
    renderCameraMatrix(cameras) {
        return (
            <CameraTable cameras={cameras} rows={cameras.length} columns={cameras.length}/>
        );
    }

    updateUbications () {
         let selects = document.getElementsByTagName('select');
         for (var i=0; i<selects.length; i++)  {
             let element = selects[i]
            if (element.value !== '') {
                let data = {
                    id: element.value,
                    matrix_camera_row: element.dataset.row,
                    matrix_camera_column: element.dataset.column
                }
                this.props.editCamara(data);
            }
        }
        alert('Camaras ordenadas');
        this.goBack();
    }

    render() {
        return (
            <Page justify={'flex-start'} align={'flex-start'} withHeader withSideBar>
                <SectionHeader title={'Ordenamiento de cámaras'} />
                <div className="container-fluid mt-3">
                    {this.renderCameraMatrix(this.props.location.state.cameras)}
                </div>
                <div className="container-fluid mt-3">
                        <button onClick={() => this.updateUbications()} className="btn btn-primary mr-2">Actualizar</button>
                        <button onClick={this.goBack} className="btn btn-danger">Cancelar</button>
                </div>
                
                
            </Page>
        )
    }
}

const mapStateToProps = (state) => {
	return {}
  }

const mapDispatchToProps = {
    editCamara
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
  )(CameraSort)