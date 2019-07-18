import React, {Component, PropTypes} from "react";
import axios from 'axios';
import $ from 'jquery';
import {Link} from 'react-router-dom';


export default class ClientePagina extends Component {
	constructor(props){
		super(props);
    this.state={cliente:{},
                nombre:'',
                apellido:'',
                cedula:0,
                tarjeta:0,
                fechaVencimiento:null,

                }
	}

	componentWillMount () {
    axios.get('https://htfinanzasback.herokuapp.com/cliente?id='+this.props.match.params.idPost,{ crossdomain: true })
      .then(res => {
        this.setState({cliente:res.data,
                      nombre:res.data.nombre,
                      apellido:res.data.apellido,
                      cedula:res.data.cedula,
                      tarjeta:res.data.tarjeta,
                      fechaVencimiento:res.data.fechaVencimiento});
      })
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
    var url='https://htfinanzasback.herokuapp.com/actualizar?id='+this.props.match.params.idPost;
    // axios.interceptors.request.use(request => {
    //   console.log('Starting Request', request)
    //   return request
    // })
    axios.post(url,  formData,{ headers: {
        'Content-Type': 'application/json'
    } })
      .then(res => {
        if(res.status===200 || res.status==201){
          alert("los cambios fueron guardados exitosamente");
          this.forceUpdate();
        }
        else{
          alert("Hubo un error. Status "+res.status);
        }
      });
  }
	render() {
		return (

			<div className="row">
        <div className="container col-6 py-5">
				<h2>Cliente {this.props.match.params.idPost}</h2>
        <form id="myForm" onSubmit={this.submit.bind(this)}>
          <div className="form-group ">
            <label for="nombre">Nombre:</label>
            <input onChange={this.onNombreChange.bind(this)} defaultValue={this.state.cliente.nombre} type="text" className="form-control" id="nombre" aria-describedby="emailHelp" placeholder="Nombre"/>
          </div>
          <div className="form-group">
            <label for="apellido">Apellido:</label>
            <input onChange={this.onApellidoChange.bind(this)} defaultValue={this.state.cliente.apellido} type="text" className="form-control" id="apellido" placeholder="Apellido"/>
          </div>
          <div className="form-group">
            <label for="cedula">Número de cédula:</label>
            <input min="10000000" max="2147483647" onChange={this.onCedulaChange.bind(this)} defaultValue={this.state.cliente.cedula} type="number" className="form-control" id="cedula" placeholder="Cédula"/>
          </div>
          <div className="form-group ">
            <label for="tarjeta">Número de tarjeta de crédito:</label>
            <input min="1000000000000000" max="9999999999999999" onChange={this.onTarjetaChange.bind(this)} defaultValue={this.state.cliente.tarjeta} type="number" className="form-control" id="tarjeta" aria-describedby="tarjetaHelp" placeholder="# tarjeta"/>
            <small id="tarjetaHelp" className="form-text text-muted">Nunca vamos a compartir la información de tu tarjeta con nadie.</small>
          </div>
          <div className="form-group ">
            <label for="fechaVencimiento">Fecha de vencimiento:</label>
            <input onChange={this.onFechaVencimientoChange.bind(this)} defaultValue={this.state.cliente.fechaVencimiento?this.state.cliente.fechaVencimiento.split("-",2)[0]+'-'+this.state.cliente.fechaVencimiento.split("-",2)[1]:""} type="month" className="form-control" id="fechaVencimiento" aria-describedby="tarjetaHelp" placeholder=""/>
            <small id="tarjetaHelp" className="form-text text-muted">Nunca vamos a compartir la información de tu tarjeta con nadie.</small>
          </div>
          <button type="submit" className="btn btn-primary">Guardar</button>
          <Link to="/"><button className="btn btn-secondary">Volver</button></Link>
        </form>
        </div>
        <div className="container col-4 py-5">

        </div>
			</div>
		);
	}
}
