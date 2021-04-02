import React from 'react';
import { connect } from 'react-redux'
import { fetchAudits } from 'actions/audits'
import { Line /*, Bar, Doughnut , Radar, Polar, Pie */ } from 'react-chartjs-2';
import AuditModal from '../AuditModal';
import { format } from 'date-fns';

class AuditShow extends React.Component {

    _isMounted = false;

    constructor(props) {
      super(props);
      this.state = {
        titulo: 'Historial de búsqueda',
        inputLine: '',
        detalle: '',
        filter: '',
        audits: [],
        filterAudits: []
      };
    }

    componentDidMount(){
      this._isMounted = true;
      this.props.fetchAudits()
      this.props.fetchAudits()
      this.reloadHistorico();
      setInterval(() => { this.loadAudits() }, 1000)
      
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    reloadHistorico() {
      //extraemos solo la fecha de la lista filtrada.
      let registrys = []
      let new_registry = {
        fecha : 0,
        contador : 0
      }
      for (let i = 0; i < this.state.filterAudits.length; i++) {
        new_registry = {
          fecha : this.state.filterAudits[i].fecha.substr(0,10),
          contador : 1
        }
        registrys.push(new_registry)  
      }
      //funcion que se encarga de agrupar y contar los lock por fecha.
      var groupBy = function (miarray, prop) {
        return miarray.reduce(function(groups, item) {
            var val = item[prop];
            groups[val] = groups[val] || {fecha: item.fecha, contador: 0};
            groups[val].contador += item.contador;
            return groups;
        }, {});
      }
      //implementar el metodo.
      let resultData = Object.values(groupBy(registrys,'fecha'))
      let fechaList=[]
      let datoList=[]
      for (let i = 0; i < resultData.length; i++)
      {
        fechaList.push(resultData[i].fecha)
        datoList.push(resultData[i].contador)
      }
      var fecha = fechaList
      var cantOperaciones = datoList
      
      //resetear state.
      this.setState({ 
        inputLine: 
        {
          labels: fecha,
          datasets: [
            {
              label: 'Logs',
              backgroundColor:'rgba(165, 24, 24, 0.7)',
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 2,
              data: cantOperaciones
            }
          ]
        }
      });
    }

    showDetail(id)
    {
      let response = this.props.audits.data
      for (let i = 0; i < response.length; i++) {
        if (response[i].id===id)
        {
          this.setState( { detalle: response[i].detalle } )
          break;
        }
      }
    }

    filtroHandler(e)
    {
      this.setState({ filter: document.getElementById("filtro").value });
    }

    loadAudits()
    {
      if(this._isMounted){
        let response = this.props.audits.data
        let auditsList = []
        let new_audit = {
          id : 0,
          username : '',
          fecha : '',
          tipo: '',
          operacion: ''
        }
        for (let i = 0; i < response.length; i++) {
          new_audit = {
            id : response[i].id,
            username : response[i].username,
            fecha : format(new Date(response[i].fecha), 'dd/MM/yyyy kk:mm:ss'),
            tipo: response[i].tipo,
            operacion: response[i].operacion
          }
          auditsList.push(new_audit)  
        }
        this.setState( { audits: auditsList } )
        var filtroRead = this.state.filter;

        let filterAuditsList = []
        for (let i = 0; i < this.state.audits.length; i++) {
          var cadena = this.state.audits[i].username+" "+this.state.audits[i].tipo+" "+this.state.audits[i].operacion
          cadena = cadena.toLowerCase();
          if(cadena.includes(filtroRead.toLowerCase()))
          {
            new_audit = {
              id : this.state.audits[i].id,
              username : this.state.audits[i].username,
              fecha : this.state.audits[i].fecha,
              tipo: this.state.audits[i].tipo,
              operacion: this.state.audits[i].operacion
            }
            filterAuditsList.push(new_audit)
          }
        }
        this.setState( { filterAudits: filterAuditsList } )
        this.reloadHistorico();
      }
      
    }

    renderAudits()
    {
      const audits = this.state.filterAudits.map((audit, index) => {
        return (
          <tr key={index} className="">
            <td>{audit.username}</td>
            <td>{audit.fecha}</td>
            <td>{audit.tipo}</td>
            <td>{audit.operacion}</td>
            <td>
              <button data-toggle="modal" data-target="#exampleModal" type="button" className="btn btn-primary" onClick={() => this.showDetail(audit.id)}>Ver detalles</button>
            </td>
          </tr>
        )
      });
  
      return(
        <div className="mt-3 mb-3" style={{ height: "250px", overflowY: "auto", border: "1px solid black"}} >
        <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Usuario</th>
                <th scope="col">Fecha</th>
                <th scope="col">Tipo</th>
                <th scope="col">Operación</th>
                <th scope="col">Detalle</th>
              </tr>
            </thead>
            <tbody>
                {audits}
            </tbody>
        </table>
        </div>
      );
    }
  

    render() {
        return (
          <div>
            <div className="">
              <div className="mt-3 mb-3">
                <input  className="form-control" id="filtro"  placeholder="Búsqueda por usuario, tipo u operación." onChange={(e) => this.filtroHandler(e)}/>
              </div>            
              { this.renderAudits() }
              <Line
                data={this.state.inputLine}
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

            <AuditModal
              detalle={this.state.detalle}
            />
          </div>
        );
    }
}

const mapStateToProps = ({ audits }) => ({
	audits
})

const mapDispatchToProps = {
  fetchAudits
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
) (AuditShow)