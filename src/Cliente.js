import React, {Component, PropTypes} from "react";
import {Link} from 'react-router-dom';

export default class Cliente extends Component {
	constructor(props){
		super(props);
	}


	render() {
    console.log(this.props)
		return (

      <div className="col-sm-3 py-2">
        <div className="card">
        <div id={this.props.cliente.id} className="card-header text-center"><Link to={"cliente/"+this.props.cliente.id}><b>Cliente {this.props.cliente.id}</b></Link></div>
                  <div className="card-body" >
                    <h6>{this.props.cliente.cedula}</h6>
                    <hr />
                      <p className="card-text">
                      {this.props.cliente.nombre} {this.props.cliente.apellido}
                      </p>
                  </div>
        </div>
      </div>
		);
	}
}
