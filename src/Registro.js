import React, {Component, PropTypes} from "react";
import axios from 'axios';
import $ from 'jquery';
import {Link} from 'react-router-dom';


export default class ClientePagina extends Component {
	constructor(props){
		super(props);
    this.state={nombre:'',
                apellido:'',
                cedula:0,
                tarjeta:0,
                fechaVencimiento:null
                }
	}

  onNombreChange(event){
      this.setState({nombre:event.target.value});
      console.log(this.state)
  }
  onApellidoChange(event){
    this.setState({apellido:event.target.value});
    console.log(this.state)
  }
  onCedulaChange(event){
    this.setState({cedula:event.target.value});
    console.log(this.state)
  }
  onTarjetaChange(event){
    this.setState({tarjeta:event.target.value});
    console.log(this.state)
  }
  onFechaVencimientoChange(event){
    this.setState({fechaVencimiento:event.target.value+"-01"});
    console.log(this.state)
  }
  submit(event){
    event.preventDefault();
    var datos={nombre:this.state.nombre,
                apellido:this.state.apellido,
                cedula:this.state.cedula,
                tarjeta:this.state.tarjeta,
                fechaVencimiento:this.state.fechaVencimiento};
    var formData = JSON.stringify(datos);
    var url='https://htfinanzasback.herokuapp.com/registrar';
    // axios.interceptors.request.use(request => {
    //   console.log('Starting Request', request)
    //   return request
    // })
    axios.post(url,  formData,{ headers: {
        'Content-Type': 'application/json'
    } })
      .then(res => {
            if(res.status===200 || res.status==201){
              alert("El cliente fue registrado exitosamente.");
              window.location = '/';
            }
            else{
              alert("Hubo un error. Status "+res.status);
            }
        },
        error=> {
            alert("Hubo un error: "+error);
        });
  }
	render() {
		return (

			<div className="row">
        <div className="container col-6 py-5">
				<h2>Registro</h2>
        <form id="myForm" onSubmit={this.submit.bind(this)}>
          <div className="form-group ">
            <label for="nombre">Nombre:</label>
            <input required="true" onChange={this.onNombreChange.bind(this)}  type="text" className="form-control" id="nombre" aria-describedby="emailHelp" placeholder="Nombre"/>
          </div>
          <div className="form-group">
            <label for="apellido">Apellido:</label>
            <input required="true" onChange={this.onApellidoChange.bind(this)} type="text" className="form-control" id="apellido" placeholder="Apellido"/>
          </div>
          <div className="form-group">
            <label for="cedula">Número de cédula:</label>
            <input min="10000000" max="2147483647" required="true" onChange={this.onCedulaChange.bind(this)}  type="number" className="form-control" id="cedula" placeholder="Ej: 1111222333"/>
          </div>
          <div className="form-group ">
            <label for="tarjeta">Número de tarjeta de crédito:</label>
            <input min="1000000000000000" max="9999999999999999"required="true" onChange={this.onTarjetaChange.bind(this)}  type="number" className="form-control" id="tarjeta" aria-describedby="tarjetaHelp" placeholder="Ej: 1111222233334444"/>
            <small id="tarjetaHelp" className="form-text text-muted">Nunca vamos a compartir la información de tu tarjeta con nadie.</small>
          </div>
          <div className="form-group ">
            <label for="fechaVencimiento">Fecha de vencimiento:</label>
            <input required="true" onChange={this.onFechaVencimientoChange.bind(this)} type="month" className="form-control" id="fechaVencimiento" aria-describedby="tarjetaHelp" placeholder="Ej: 2020-02"/>
            <small id="tarjetaHelp" className="form-text text-muted">Nunca vamos a compartir la información de tu tarjeta con nadie.</small>
          </div>
          <button type="submit" className="btn btn-primary">Registrar</button>
          <Link to="/"><button className="btn btn-secondary">Volver</button></Link>
        </form>
        </div>
        <div className="container col-4 py-5">

        </div>
			</div>
		);
	}
}
