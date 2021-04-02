import React from 'react'
import { connect } from 'react-redux'
import { fetchParkings, deleteParking, addParking } from '../../actions/parkings'
import { fetchConfiguration } from '../../actions/configuration'
import Page from '../../components/Page';
import SectionHeader from '../../components/SectionHeader'
import './ConfigureParking.css';
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

// A new component based on Button, but with some override styles
const TomatoButton = styled(Button)`
  color: red;
  border-color: tomato;
  
  display: inline;
  text-align: right;
`;

// A new component based on Button, but with some override styles
const LimeButton = styled(Button)`
  color: green;
  border-color: lime;
  display: inline;
  text-align: right; 
`;

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

  &:hover {
    font-weight: bold;
  }
  
`

class ConfigureParking extends React.Component {


    refresh = () => {
        this.props.history.push('/home');
    };

    componentDidMount() {
        this.props.fetchConfiguration()
        this.props.fetchParkings()
        //setInterval(() => { this.props.fetchParkings() }, 1000)
        window.onload = () => {
            this.drawParkingsLabels(this.props.parkings.data, this.props.location.state.camara.id)
        }
        this.drawParkingsLabels(this.props.parkings.data, this.props.location.state.camara.id)
    }
    
    clearCanvas() {
        const canvas = document.getElementById('parkingCanvas');
        if (canvas ) {
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0 , canvas.width, canvas.height);
        }
    }

	drawParkingsLabels (response, cameraId) {
        if (response.length) {
            const canvas = document.getElementById('parkingCanvas');
            if (canvas ) {
                const ctx = canvas.getContext("2d");
                ctx.fillStyle = "#FFFFFF";

                for (let i = 0; i < response.length; i++) {
                    if (response[i].cameraId===cameraId)
                    {
                        let text = response[i].id
                        ctx.font = "30px Courier"
                        let x = response[i].tl_x + (response[i].br_x /2)
                        let y = response[i].tl_y + (response[i].br_y /2)
                        ctx.fillText(text, x, y)
                    }
                }
            }

        }

    }

    drawCoord (lastPositionX, lastPositionY, actualPositionX, actualPositionY, type, deletePreviousCoord) {
        const canvas = document.getElementById('parkingCanvas');
        if (canvas ) {
            const ctx = canvas.getContext("2d");
            
            ctx.fillStyle = "#FFFFFF";
            ctx.font = "50px Courier";

            if(type === 'origin'){
                ctx.fillStyle = "#000fff" 
            }

            if(type === 'size'){
                ctx.fillStyle = "#1bff00" 
            }
            
            if(type === 'distance'){
                ctx.fillStyle = "#ff1300"
            }
            
            if(deletePreviousCoord)
                ctx.clearRect(lastPositionX - 20, lastPositionY - 20, 50, 50);
            ctx.fillText('.', actualPositionX, actualPositionY);
        }        
    }

    constructor(props) {
        super(props);
        this.state = { 
          x: 0, 
          y: 0,
          lastPositionPointOriginX: null,
          lastPositionPointOriginY: null,
          lastPositionSizeX: null,
          lastPositionSizeY: null,
          lastPositionDistanceX: null,
          lastPositionDistanceY: null, 
          selectPO: true, 
          selectT: false, 
          selectD: false, 
          POx:0, 
          POy:0, 
          Tw:0 , 
          Th:0, 
          distance:0,
          topLeft: '',
          bottomRight: '',
          distanceDot: '',
          padding_x: 206,
          padding_y: -40,
          cantidad: 0,
          parkingDelete: [],
        };
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
        if(this.state.selectPO)
        {
            if(this.state.lastPositionPointOriginX !== null || this.state.lastPositionPointOriginY !== null) {
                deletePreviousCoord = true;
            }            
            this.drawCoord(this.state.lastPositionPointOriginX,this.state.lastPositionPointOriginY,this.state.x,this.state.y,'origin',deletePreviousCoord);
            this.setState({ POx : this.state.x, POy : this.state.y, lastPositionPointOriginX: this.state.x, lastPositionPointOriginY: this.state.y });
        }
        if(this.state.selectT)
        {
            if(this.state.lastPositionSizeX !== null || this.state.lastPositionSizeY !== null) {
                deletePreviousCoord = true;
            }    
            this.drawCoord(this.state.lastPositionSizeX,this.state.lastPositionSizeY,this.state.x,this.state.y,'size',deletePreviousCoord);
            this.setState({ Tw: this.state.x-this.state.POx, Th: this.state.y-this.state.POy, lastPositionSizeX: this.state.x, lastPositionSizeY : this.state.y })
        }
        if(this.state.selectD)
        {
            var e = document.getElementById("direccion");
            var strAddress = e.value;
            var valueDistance;
            if(this.state.lastPositionDistanceX !== null || this.state.lastPositionDistanceY !== null) {
                deletePreviousCoord = true;
            }
            this.drawCoord(this.state.lastPositionDistanceX,this.state.lastPositionDistanceY,this.state.x,this.state.y,'distance',deletePreviousCoord);
            if(strAddress==="Derecha")
            {
                valueDistance = this.state.x-(this.state.POx+this.state.Tw);
            }
            if(strAddress==="Izquierda")
            {
                valueDistance = this.state.POx - this.state.x;          
            }
            if(strAddress==="Arriba")
            {
                valueDistance = this.state.POy - this.state.y;  
            }
            if(strAddress==="Abajo")
            {
                valueDistance = this.state.y-(this.state.POy+this.state.Th);
            }
            this.setState({ distance: valueDistance, lastPositionDistanceX: this.state.x, lastPositionDistanceY: this.state.y })
        }
    }

    selectPO()
    {
        this.setState( { selectPO: true, selectT: false, selectD:false } )
    }

    selectT()
    {
        this.setState( { selectPO: false, selectT: true, selectD:false } )
    }

    selectD()
    {
        this.setState( { selectPO: false, selectT: false, selectD:true } )
    }

    crearParkings()
    {
        var e = document.getElementById("direccion");
        var strAddress = e.value;

        if (!window.confirm("Desea guardar los estacionamientos?")) return;
        let new_parkings = []

        let new_parking = {
            tl_x : this.state.POx,
            tl_y : this.state.POy,
            br_x : this.state.Tw,
            br_y: this.state.Th,
            cameraId: this.props.location.state.camara.id
        }
        new_parkings.push(new_parking)

        var valueX;
        var valueY;

        for(let i = 1; i <= this.state.cantidad; i++)
        {    
            if(strAddress==="Derecha")
            {
                valueX = this.state.POx + (this.state.Tw * i) + (this.state.distance * i)
                valueY = this.state.POy
            }
            if(strAddress==="Izquierda")
            {
                valueX = this.state.POx - (this.state.Tw * i) - (this.state.distance * i)
                valueY = this.state.POy                
            }
            if(strAddress==="Arriba")
            {
                valueX = this.state.POx
                valueY = this.state.POy - (this.state.Th * i) - (this.state.distance * i)
            }
            if(strAddress==="Abajo")
            {
                valueX = this.state.POx
                valueY = this.state.POy + (this.state.Th * i) + (this.state.distance * i)
            }

            new_parking = {
                tl_x : valueX,
                tl_y : valueY,
                br_x : this.state.Tw,
                br_y: this.state.Th,
                cameraId: this.props.location.state.camara.id
            }
            new_parkings.push(new_parking)
        }

        new_parkings.forEach((parking) => {
            this.props.addParking(parking)
        });
        alert('Se guardaron los estacionamientos')

        let hasta = parseInt(this.state.cantidad)+5
        for (let i = 0; i <= hasta ; i++) {
            this.props.fetchParkings()
        }
        this.refresh();
    }

    borrarParking()
    {
        let cantToDelete = 0;
        for (let i = 0; i < this.state.parkingDelete.length; i++) {
            if (this.state.parkingDelete[i].select===true) {
                cantToDelete++;
            }
        }

        if(cantToDelete === 0) {
            alert('Debe seleccionar al menos un parking');
            return;
        }
            
        if (!window.confirm("Desea borrar los estacionamientos seleccionados?")) return;

        let cantDelete = 0;
        for (let i = 0; i < this.state.parkingDelete.length; i++) {
            if (this.state.parkingDelete[i].select===true) {
                this.props.deleteParking(this.state.parkingDelete[i].id);
                cantDelete++;
            }
        }        

        let hasta = cantDelete+5
        for (let i = 0; i <= hasta; i++) {
            this.props.fetchParkings()
        }
        this.refresh();
    }

    updateSelection(idPark){
        for (let i = 0; i < this.state.parkingDelete.length; i++) {
            if (this.state.parkingDelete[i].id===idPark) {

                if (this.state.parkingDelete[i].select) {
                    this.state.parkingDelete[i].select = false
                }
                else {
                    this.state.parkingDelete[i].select = true
                }

            }
        }
    }

    renderParkings()
    {
        let response = this.props.parkings.data

        let new_parking = {
            id : 0,
            select : false
        }
        
        this.state.parkingDelete = [];

        for (let i = 0; i < response.length; i++) {
            if (response[i].cameraId===this.props.location.state.camara.id)
            {
                new_parking = {
                    id :  response[i].id,
                    select : false
                }
                this.state.parkingDelete.push(new_parking)
            }
        }

        const parkings = this.state.parkingDelete.map((parking, index) => {
            return (
                <tr key={index} className="">
                    <td key={parking.id}>{parking.id}</td>
                    <td key={parking.id + "u"}><input name="" type="checkbox" onClick={() => this.updateSelection(parking.id)}/> {}</td>
                </tr>
            )
        });
        
        var checkboxes = document.getElementsByTagName('input');

        for (var i=0; i<checkboxes.length; i++)  {
            if (checkboxes[i].type === 'checkbox')   {
                checkboxes[i].checked = false;
            }
        }

        return(

            <div style={{ height: "300px", overflowY: "auto", border: "1px solid black"}} >
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">IdParking</th>
                    <th scope="col">Select</th>
                    </tr>
                </thead>
                <tbody>
                    {parkings}
                </tbody>
            </table>
            </div>
        );
    }    

	render() {

        let image
		if(this.props.location.state.camara.lastFrameImageBase64){
			image = <img id="cameraImage" alt="Camara" onMouseMove={this._onMouseMove.bind(this)} onClick={this.saveCoord.bind(this)} width={this.props.location.state.camara.width} height={this.props.location.state.camara.height} src={this.props.location.state.camara.lastFrameImageBase64} />
		}
		else{
			image = <svg width="150px" height="150px" viewBox="0 0 16 16" className="bi bi-camera-video-off" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
			<path fillRule="evenodd" d="M10.961 12.365a1.99 1.99 0 0 0 .522-1.103l3.11 1.382A1 1 0 0 0 16 11.731V4.269a1 1 0 0 0-1.406-.913l-3.111 1.382A2 2 0 0 0 9.5 3H4.272l.714 1H9.5a1 1 0 0 1 1 1v6a1 1 0 0 1-.144.518l.605.847zM1.428 4.18A.999.999 0 0 0 1 5v6a1 1 0 0 0 1 1h5.014l.714 1H2a2 2 0 0 1-2-2V5c0-.675.334-1.272.847-1.634l.58.814zM15 11.73l-3.5-1.555v-4.35L15 4.269v7.462zm-4.407 3.56l-10-14 .814-.58 10 14-.814.58z"/>
		  </svg>;
		}

        return (
			<Page justify={'flex-start'} align={'flex-start'} withHeader withSideBar>
				<SectionHeader title={'Configurar lugar: ' + this.props.location.state.camara.name} />
                <div id="configureContainer" className="container">
                    <div className="row">
                        <div className="col">
                            <canvas id="parkingCanvas" ref="canvas" width={this.props.location.state.camara.width} height={this.props.location.state.camara.height} onMouseMove={this._onMouseMove.bind(this)} onClick={this.saveCoord.bind(this)}  />
                            {image}
                        </div>
                        <div className="col">
                                <div id="ListParkings" >
                                    <h3>Borrado de lugares</h3>
                                    { this.renderParkings() }                            
                                    <button type="button" style={{ margin: "20px"}} className="btn btn-danger" onClick={this.borrarParking.bind(this)}>Borrar parkings</button>
                                </div>
                        </div>
                    </div>
                </div>            
                <div className="container">
                    <div className="row">
                        <div className="col" >
                            <h3>Creación de lugares</h3>                  
                            {/* <Thing>EjeX: { x } - EjeY: { y }</Thing> */}
                            <div>
                                <Thing className="blue">Origen = X: <input type="number" style={{ width: "60px"}} value={this.state.POx} onChange={() => {}} name="ejex"></input> Y: <input type="number" style={{ width: "60px"}} value={this.state.POy} onChange={() => {}} name="ejex"></input> <Button onClick={this.selectPO.bind(this)}  type="button">Seleccionar en pantalla</Button></Thing>
                            </div>
                            <div>
                                <Thing className="green">Tamaño = W: <input type="number" style={{ width: "60px"}} value={this.state.Tw} onChange={() => {}} name="width"></input> H: <input type="number" style={{ width: "60px"}} value={this.state.Th} onChange={() => {}} name="height"></input> <LimeButton onClick={this.selectT.bind(this)} type="button">Seleccionar en pantalla</LimeButton></Thing>
                            </div>
                            <div>
                                <Thing>
                                    Direccion =                           
                                    <select id="direccion" defaultValue='Derecha'>
                                        <option>Derecha</option>
                                        <option>Izquierda</option>
                                        <option>Arriba</option>
                                        <option>Abajo</option>
                                    </select>
                                </Thing>
                            </div>
                            <div>       
                                <Thing className="red">Distancia = <input type="number" style={{ width: "60px"}} value={this.state.distance} onChange={() => {}} name="distancia"></input> <TomatoButton onClick={this.selectD.bind(this)} type="button">Seleccionar en pantalla</TomatoButton> </Thing>
                            </div>
                            <div>
                                <Thing>Cantidad a replicar = <input type="number" style={{ width: "60px"}} name="cant" onChange={this.handleCantidadChange.bind(this)} ></input></Thing>
                            </div>
                            {/*<Button primary onClick={this.crearParkings.bind(this)}>Guardar nuevos estacionamientos</Button>*/}
                            <button type="button" style={{ margin: "20px"}} className="btn btn-primary" onClick={this.crearParkings.bind(this)}>Crear parkings</button>
                        </div>

                        
                    </div>
                </div>

            </Page>
		)
	}
}

const mapDispatchToProps = {
    addParking,
    fetchConfiguration,
    fetchParkings,
    deleteParking
}

const mapStateToProps = ({ parkings, parking, configurations }) => ({
	parkings,
	parking,
    configurations
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ConfigureParking)