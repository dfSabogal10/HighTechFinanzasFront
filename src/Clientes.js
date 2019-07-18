import React, {Component, PropTypes} from "react";
import axios from 'axios';
import Cliente from './Cliente.js';

export default class Clientes extends Component {
	constructor(props){
		super(props);
		this.state={clientes:[]};
	}

	componentWillMount () {
    axios.get('https://htfinanzasback.herokuapp.com/clientes',{ crossdomain: true })
      .then(res => {
        this.setState({clientes:res.data});
        console.log(this.state);
      })
  }


  componentDidMount(){

  }
	render() {
		return (

			<div className="row">
				<div className="container col-10 py-5">
				<h2> Clientes</h2>
        <div className="row">
				{this.state&&this.state.clientes&&this.state.clientes.map(cliente => {
						return <Cliente cliente={cliente} key={cliente.id}/>})}
          </div>
				</div>


			</div>
		);
	}
}
