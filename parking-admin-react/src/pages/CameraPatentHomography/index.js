import React from 'react'
import { connect } from 'react-redux'
import { fetchCamarasPatente, editCamaraPatente } from '../../actions/camarasPatente'
import Page from '../../components/Page'
import SectionHeader from '../../components/SectionHeader'
import CameraSection from '../../components/CameraSection'
import './CamaraPatentHomography.css';
import styled from 'styled-components'

// Define our button, but with the use of props.theme this time
const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "blue" : "white"};
  color: ${props => props.primary ? "white" : "blue"};

  font-size: 1em;
  margin: 1em;
  border: 2px solid blue;
  border-radius: 3px;
`;

// We are passing a default theme for Buttons that arent wrapped in the ThemeProvider
Button.defaultProps = {
  theme: {
    main: "blue"
  }
}

const Thing = styled.div.attrs((/* props */) => ({ tabIndex: 0 }))`
  color: black;
  &.blue {
      color: blue;
  }
  
  &.green {
      color: green;
  }

  &.red {
      color: red;
  }

  &.pink {
      color: #ff1493;
  }

  &:hover {
    font-weight: bold;
  }
  
`

class CameraPatentHomography extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state.camera.id,
            x_izqsup: this.props.location.state.camera.x_izqsup,
            y_izqsup: this.props.location.state.camera.y_izqsup,
            x_izqinf: this.props.location.state.camera.x_izqinf,
            y_izqinf: this.props.location.state.camera.y_izqinf,
            x_dersup: this.props.location.state.camera.x_dersup,
            y_dersup: this.props.location.state.camera.y_dersup,
            x_derinf: this.props.location.state.camera.x_derinf,
            y_derinf: this.props.location.state.camera.y_derinf,
            last_x_izqsup: this.props.location.state.camera.x_izqsup,
            last_y_izqsup: this.props.location.state.camera.y_izqsup,
            last_x_izqinf: this.props.location.state.camera.x_izqinf,
            last_y_izqinf: this.props.location.state.camera.y_izqinf,
            last_x_dersup: this.props.location.state.camera.x_dersup,
            last_y_dersup: this.props.location.state.camera.y_dersup,
            last_x_derinf: this.props.location.state.camera.x_derinf,
            last_y_derinf: this.props.location.state.camera.y_derinf,
            x: 0, 
            y: 0,
            selectIzquierdaSuperior: true,
            selectIzquierdaInferior: false,
            selectDerechaSuperior: false,
            selectDerechaInferior: false,
            blue: '#000fff',
            green: '#1bff00',
            red: '#ff1300',
            pink: '#ff1493',
            white: '#FFFFFF',
            font: '50px Courier'
        }
    }

    goBack = () => {
		this.props.history.goBack();
    };

    drawPoints(){
        const canvas = document.getElementById('parkingCanvas');
        if (canvas ) {
            const ctx = canvas.getContext("2d");

            ctx.fillStyle = this.state.white;
            ctx.font = this.state.font;

            ctx.fillStyle = this.state.blue
            ctx.fillText('.', this.state.x_izqsup, this.state.y_izqsup); 
            
            ctx.fillStyle = this.state.green
            ctx.fillText('.', this.state.x_izqinf, this.state.y_izqinf); 
            
            ctx.fillStyle = this.state.red
            ctx.fillText('.', this.state.x_dersup, this.state.y_dersup);

            ctx.fillStyle = this.state.pink
            ctx.fillText('.', this.state.x_derinf, this.state.y_derinf);
        }
    }

    _onMouseMove(e) {
        this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    }

    handleCantidadChange(e) {
        this.setState({cantidad: e.target.value});
     }

    saveCoord()
    {
        let deletePreviousCoord = false;
        if(this.state.selectIzquierdaSuperior)
        {
            if(this.state.last_x_izqsup!== null || this.state.y_izqsup !== null) {
                deletePreviousCoord = true;
            }            
            this.drawCoord(this.state.last_x_izqsup,this.state.y_izqsup,this.state.x,this.state.y,'blue',deletePreviousCoord);
            this.setState({ x_izqsup : this.state.x, y_izqsup : this.state.y, last_x_izqsup: this.state.x, last_y_izqsup: this.state.y });
        }
        if(this.state.selectIzquierdaInferior)
        {
            if(this.state.last_x_izqinf!== null || this.state.y_izqinf !== null) {
                deletePreviousCoord = true;
            }            
            this.drawCoord(this.state.last_x_izqinf,this.state.y_izqinf,this.state.x,this.state.y,'green',deletePreviousCoord);
            this.setState({ x_izqinf : this.state.x, y_izqinf : this.state.y, last_x_izqinf: this.state.x, last_y_izqinf: this.state.y });
        }
        if(this.state.selectDerechaSuperior)
        {
            if(this.state.last_x_dersup!== null || this.state.y_dersup !== null) {
                deletePreviousCoord = true;
            }            
            this.drawCoord(this.state.last_x_dersup,this.state.y_dersup,this.state.x,this.state.y,'red',deletePreviousCoord);
            this.setState({ x_dersup : this.state.x, y_dersup : this.state.y, last_x_dersup: this.state.x, last_y_dersup: this.state.y });
        }
        if(this.state.selectDerechaInferior)
        {
            if(this.state.last_x_derinf!== null || this.state.y_derinf !== null) {
                deletePreviousCoord = true;
            }            
            this.drawCoord(this.state.last_x_derinf,this.state.y_derinf,this.state.x,this.state.y,'pink',deletePreviousCoord);
            this.setState({ x_derinf : this.state.x, y_derinf : this.state.y, last_x_derinf: this.state.x, last_y_derinf: this.state.y });
        }
        
    }

    selectIzquierdaSuperior() {
        this.setState( { selectIzquierdaSuperior: true, selectIzquierdaInferior: false, selectDerechaSuperior: false, selectDerechaInferior: false } )
    }

    selectIzquierdaInferior() {
        this.setState( { selectIzquierdaSuperior: false, selectIzquierdaInferior: true, selectDerechaSuperior: false, selectDerechaInferior: false } )
    }
   

    selectDerechaSuperior() {
        this.setState( { selectIzquierdaSuperior: false, selectIzquierdaInferior: false, selectDerechaSuperior: true, selectDerechaInferior: false } )
    }

    selectDerechaInferior(){
        this.setState( { selectIzquierdaSuperior: false, selectIzquierdaInferior: false, selectDerechaSuperior: false, selectDerechaInferior: true } )
    }

    clearCanvas() {
        const canvas = document.getElementById('parkingCanvas');
        if (canvas ) {
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0 , canvas.width, canvas.height);
        }
    }

    drawCoord (lastPositionX, lastPositionY, actualPositionX, actualPositionY, type, deletePreviousCoord) {
        const canvas = document.getElementById('parkingCanvas');
        if (canvas ) {
            const ctx = canvas.getContext("2d");
            
            ctx.fillStyle = this.state.white;
            ctx.font = this.state.font;

            if(type === 'blue'){
                ctx.fillStyle = this.state.blue 
            }

            if(type === 'green'){
                ctx.fillStyle = this.state.green
            }
            
            if(type === 'red'){
                ctx.fillStyle = this.state.red
            }

            if(type === 'pink'){
                ctx.fillStyle = this.state.pink
            }
            
            if(deletePreviousCoord)
                ctx.clearRect(lastPositionX - 20, lastPositionY - 20, 50, 50);
            ctx.fillText('.', actualPositionX, actualPositionY);
        }        
    }

    guardarHomografia()
    {
        if (!window.confirm("Desea guardar la homografía?")) return;
        
        const data = {
            id: this.state.id,
            x_izqsup: this.state.x_izqsup,
            y_izqsup: this.state.y_izqsup,
            x_izqinf: this.state.x_izqinf,
            y_izqinf: this.state.y_izqinf,
            x_dersup: this.state.x_dersup,
            y_dersup: this.state.y_dersup,
            x_derinf: this.state.x_derinf,
            y_derinf: this.state.y_derinf,
        }

        this.props.editCamaraPatente(data).then(() => { 
            alert('Homografía configurada!');
            this.goBack();			
        })
    }

    capture() {
                
        let video = document.getElementsByTagName('video')[0];
        let video_height = video.videoHeight;
        let video_width = video.videoWidth;
        const canvas = document.getElementById('parkingCanvas');
        if (canvas) {
            const ctx = canvas.getContext("2d");
            canvas.width = video_width;
            canvas.height = video_height;
            canvas.style.width = video_width;
            canvas.style.height = video_height;
            ctx.width = video_width;
            ctx.height = video_height;

            //draw image to canvas. scale to target dimensions
            ctx.drawImage(video, 0, 0, video_width, video_height);
            //convert to desired file format
            const dataURI = canvas.toDataURL('image/jpeg'); // can also use 'image/png'
            const cameraImage = document.getElementById('cameraImage');
            let showImage = dataURI !== 'data:,'
            if(cameraImage && showImage) {
                cameraImage.width = video_width;
                cameraImage.height = video_height;
                cameraImage.src = dataURI;
                this.setState({isBoxVisible : true})
                this.drawPoints()
            }
            else{
                alert('No se puede obtener captura del video. Revise que pueda verse la camara en vivo y reintente más tarde')
                this.goBack()
            }
        }  
        
    }

    render() {
        const { isBoxVisible } = this.state;
        
        return (
            <Page justify={'flex-start'} align={'flex-start'} withHeader withSideBar>
                <SectionHeader title={'Configurar homografía de cámara de patente: ' + this.props.location.state.camera.name} />
                <CameraSection camera={this.props.location.state.camera} className="hidden"/>
                <div id="configureContainer" className={`container ${isBoxVisible ? "" : "hidden"}`}>                    
                    <div className="row">
                        <div className="col">
                            <canvas id="parkingCanvas" ref="canvas" width={this.props.location.state.camera.width} height={this.props.location.state.camera.height}  onMouseMove={this._onMouseMove.bind(this)} onClick={this.saveCoord.bind(this)}  />
                            <img id="cameraImage" alt="Camara" width={this.props.location.state.camera.width} height={this.props.location.state.camera.height} onMouseMove={this._onMouseMove.bind(this)} onClick={this.saveCoord.bind(this)} />
                        </div>
                    </div>
                </div>
                <div className="container">                  
                    <div className="row">
                        <div className="col" >                            
                            <h3>Capturar Coordenadas para Configurar Homografía</h3>
                            <button type="button" className="btn btn-dark mt-3 mb-3" onClick={this.capture.bind(this)}>Obtener Imagén Actual</button>
                            <div>
                                <Thing className="blue">Izquierda Superior = X: <input type="number" style={{ width: "60px"}} value={this.state.x_izqsup} onChange={() => {}} name="ejex"></input> Y: <input type="number" style={{ width: "60px"}} value={this.state.y_izqsup} onChange={() => {}} name="ejex"></input> <Button onClick={this.selectIzquierdaSuperior.bind(this)}  type="button">Seleccionar en pantalla</Button></Thing>
                            </div>
                            <div>
                                <Thing className="green">Izquierda Inferior = X: <input type="number" style={{ width: "60px"}} value={this.state.x_izqinf} onChange={() => {}} name="ejex"></input> Y: <input type="number" style={{ width: "60px"}} value={this.state.y_izqinf} onChange={() => {}} name="ejex"></input> <Button onClick={this.selectIzquierdaInferior.bind(this)}  type="button">Seleccionar en pantalla</Button></Thing>
                            </div>
                            <div>
                                <Thing className="red">Derecha Superior = X: <input type="number" style={{ width: "60px"}} value={this.state.x_dersup} onChange={() => {}} name="ejex"></input> Y: <input type="number" style={{ width: "60px"}} value={this.state.y_dersup} onChange={() => {}} name="ejex"></input> <Button onClick={this.selectDerechaSuperior.bind(this)}  type="button">Seleccionar en pantalla</Button></Thing>
                            </div>
                            <div>
                                <Thing className="pink">Derecha Inferior = X: <input type="number" style={{ width: "60px"}} value={this.state.x_derinf} onChange={() => {}} name="ejex"></input> Y: <input type="number" style={{ width: "60px"}} value={this.state.y_derinf} onChange={() => {}} name="ejex"></input> <Button onClick={this.selectDerechaInferior.bind(this)}  type="button">Seleccionar en pantalla</Button></Thing>
                            </div>                            
                            <button type="button" className="btn btn-primary mt-3" onClick={this.guardarHomografia.bind(this)}>Guardar Homografía</button>
                        </div>
                    </div>
                </div>
            </Page>
        )
    }
}

const mapStateToProps = ({ camaras }) => ({
    camaras
})

const mapDispatchToProps = {
    fetchCamarasPatente,
    editCamaraPatente
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CameraPatentHomography)