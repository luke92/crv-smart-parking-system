import React from 'react'

class CameraTable extends React.Component {
    constructor(props) {
        super(props);
        let matrix = []
        
        for (let i=0; i<this.props.rows; i++)  {
            matrix[i] = [];
            for (let j=0; j<this.props.columns; j++)  {
                let camaras = [];
                for ( let k = 0; k < this.props.columns; k++) {
                    let selected = this.props.cameras[k].matrix_camera_row === i && this.props.cameras[k].matrix_camera_column === j;
                    
                    let data = {
                        id: this.props.cameras[k].id,
                        name: this.props.cameras[k].name,
                        selected: selected
                    };

                    camaras[k] = data;
                    
                }

                matrix[i][j] = camaras;
                
            }
        }
        this.state = {
        	matrix: matrix
        };
    }


    componentDidMount() {

	}

    drawColumns(x) {
        let cameras = this.props.cameras
        return this.state.matrix[x].map(function(c, j) {
            let selectedId = null;
            for( let i = 0; i < c.length; i++) {
                if(c[i].selected)
                    selectedId = c[i].id;
            }
                
            let options = cameras.map((d,i) => {
                return <option key={x + "option" + j + "index" + i} value={d.id}>{d.name}</option>
            });
            return <td key={x + "td" + j}>({x}, {j})
                <select key={x + "select" + j} data-row={x} data-column={j} defaultValue={selectedId} >
                    <option key={x + "option" + j + "o-1"} value="">Sin camara</option>
                    {options}
                </select>
            </td>
        })
    }

    drawRows() {
        return (
            <tbody>
            {this.state.matrix.map((c, i) => <tr key={c + "tr" + i}>{this.drawColumns(i)}</tr>)}
            </tbody>
        )
    }

    render() {
        return (
            <table className="table table-bordered">
                {this.drawRows()}
            </table>
        )
    }
}

export default CameraTable