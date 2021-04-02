import React from 'react';
import { Bar /*, Doughnut, Line, Radar, Polar,Pie */ } from 'react-chartjs-2';

class BarReportEstacionamiento extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        titulo: 'Mensual',
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
        var meses = ['May 2019', 'June 2019','July 2019','August 2019','September 2019','October 2019','November 2019','Dicember 2019','January 2020','February 2020','March 2020','April 2020']
        var dato = [65, 59, 80, 81, 56, 23, 65, 59, 80, 81, 56, 23]
    
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
                backgroundColor:'rgba(4, 6, 27, 0.89)',
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
export default BarReportEstacionamiento