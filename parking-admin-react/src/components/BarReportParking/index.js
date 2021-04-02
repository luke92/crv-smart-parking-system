import React from 'react';
import { Bar /*, Doughnut, Line, Radar, Polar,Pie */ } from 'react-chartjs-2';

class BarReportParking extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        titulo: '',
        inputBar: ''
      };
    }
    
    componentDidMount(){
      this.reloadBar();
    }
    
    reloadBar() {

        //Le damos los datos al Cubo para procesar..
        var strMesDesde = document.getElementById("mesdesde").value;
        var strAnioDesde = document.getElementById("aniodesde").value;
        var strMesHasta = document.getElementById("meshasta").value;
        var strAnioHasta = document.getElementById("aniohasta").value;
        console.log("Desde: "+strMesDesde+" - "+strAnioDesde)
        console.log("Hasta: "+strMesHasta+" - "+strAnioHasta)
        
        //CUBO-API... trabajando

        //Algo asi, devolveria el cubo 
        var meses = ['Parking Id: 60', 'Parking Id: 61','Parking Id: 6', 'Parking Id: 1', 'Parking Id: 10', 'Parking Id: 4', 'Parking Id: 23']
        var dato = [200, 346, 202, 20, 341, 51, 45]
    
        this.setState({ 
          inputBar: 
          {
            labels: meses,
            datasets: [
              {
                label: 'Entradas',
                //backgroundColor: [
                //  'rgba(75,192,192,1)',
                //  'rgba(75,162,12,35)',
                //  'rgba(7,122,1,17)'],   
                backgroundColor:'rgba(20, 138, 51, 0.89)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: dato
              }
            ]
          }
        });
      }

    render() {
        return (
            <div>
                <div className="d-inline-flex mt-2">
                    <h5>De</h5>
                    <select className="form-control" id="mesdesde" onChange={this.reloadBar.bind(this)}>
                        <option selected>January</option>
                        <option>February</option>
                        <option>March</option>
                        <option>April</option>
                        <option>May</option>
                        <option>June</option>
                        <option>July</option>
                        <option>August</option>
                        <option>September</option>
                        <option>October</option>
                        <option>November</option>
                        <option>Dicember</option>
                    </select>
                    <select className="form-control" id="aniodesde" onChange={this.reloadBar.bind(this)}>
                        <option selected>2019</option>
                        <option>2020</option>
                    </select>
                </div>
                <div className="d-inline-flex mt-2">
                    <h5>a</h5>
                    <select className="form-control" id="meshasta" onChange={this.reloadBar.bind(this)}>
                        <option selected>January</option>
                        <option>February</option>
                        <option>March</option>
                        <option>April</option>
                        <option>May</option>
                        <option>June</option>
                        <option>July</option>
                        <option>August</option>
                        <option>September</option>
                        <option>October</option>
                        <option>November</option>
                        <option>Dicember</option>
                    </select>
                    <select className="form-control" id="aniohasta" onChange={this.reloadBar.bind(this)}>
                        <option> 2019</option>
                        <option selected>2020</option>
                    </select>
                </div>
                <Bar
                    data={this.state.inputBar}
                    options={{
                        title:{
                        display:true,
                        text: this.state.titulo,
                        fontSize:20
                        },
                        legend:{
                        display:true,
                        position:'right'
                        }
                    }}
                />
            </div>
        );
    }

}
export default BarReportParking