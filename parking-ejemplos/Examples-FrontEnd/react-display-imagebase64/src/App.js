import React from 'react';
import './App.css';
import imgHomo from '../src/images/cam2-homografica.png'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      x: 0, 
      y: 0, 
      selectPO: true, 
      selectT: false, 
      selectD: false, 
      POx:0, 
      POy:0, 
      Tw:0 , 
      Th:0, 
      D:0,
      topLeft: '.',
      bottomRight: '.',
      distanceDot: '.',
    };
  }

  _onMouseMove(e) {
    this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }

  saveCoord()
  {
    if(this.state.selectPO)
    {
      this.setState({ POx : this.state.x, POy : this.state.y });
      document.getElementById('topLeftDot').style.left = this.state.POx + "px";
      document.getElementById('topLeftDot').style.top = (this.state.POy - 100) + "px";
    }
    if(this.state.selectT)
    {
      this.setState({ Tw: this.state.x-this.state.POx, Th: this.state.y-this.state.POy })
      document.getElementById('bottomRightDot').style.left = (this.state.POx + this.state.Tw) + "px";
      document.getElementById('bottomRightDot').style.top = (this.state.Th + this.state.POy - 100) + "px";
    }
    if(this.state.selectD)
    {
      this.setState({ D: this.state.x-(this.state.POx+this.state.Tw) })
      document.getElementById('distanceDot').style.left = (this.state.POx + this.state.Tw + this.state.D) + "px";
      document.getElementById('distanceDot').style.top = (this.state.Th + this.state.POy - 100) + "px";
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
    //recorrer cantidad 
      //crear objeto (con x,y,w,h)
      //post
  }

  render() {
    const { x, y } = this.state;
    return <div className="container">
      <div className="container">
        <img onMouseMove={this._onMouseMove.bind(this)} onClick={this.saveCoord.bind(this)} width="400" height="350" src={imgHomo}/>
        <div id="distanceDot" className="dot brown">{this.state.distanceDot}</div>
        <div id="topLeftDot" className="dot">{this.state.topLeft}</div>
        <div id="bottomRightDot" className="dot">{this.state.bottomRight}</div>
      </div>
      
      <h3>EjeX: { x } - EjeY: { y }</h3>
      <h2>FORMULARIO</h2>
      <div>
        <h4>Punto Origen = X: <input type="number" value={this.state.POx} name="ejex"></input> Y: <input type="number" value={this.state.POy} name="ejex"></input> <button onClick={this.selectPO.bind(this)}  type="button">Select</button></h4> 
      </div>
      <div>
        <h4>Tamanio = Width: <input type="number" value={this.state.Tw} name="width"></input> Height: <input type="number" value={this.state.Th} name="height"></input> <button onClick={this.selectT.bind(this)} type="button">Select</button></h4>
      </div>
      <div>       
        <h4>Distancia = <input type="number" value={this.state.D} name="distancia"></input> <button onClick={this.selectD.bind(this)} type="button">Select</button> </h4>
      </div>
      <div>
        <h4>Cantidad a crear = <input type="number" name="cant"></input></h4>
      </div>
      <button onClick={this.crearParkings.bind(this)} type="button">Submit</button>
    </div>;
  }

}

export default App;