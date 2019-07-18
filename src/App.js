import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
		BrowserRouter as Router,
		Route,
		Link
	} from "react-router-dom";
import Clientes from './Clientes.js';
import ClientePagina from './ClientePagina.js';
import Registro from './Registro.js';

function App() {
  return (
    <section>
				<Router>
					<div>
    				<nav className="navbar navbar-dark bg-dark">
    	  			<div className="container-fluid">
    	    			<div className="navbar-header">
    				      <a className="navbar-brand" href="/">High Tech Finanzas</a>
    	    			</div>

    	    			<ul className="nav navbar-nav navbar-right">
    	      		<li><Link to="/registro">Registro</Link></li>
    					</ul>
    	  			</div>
    				</nav>
			      <Route exact path="/" component={Clientes} />
			      <Route path="/cliente/:idPost" component={ClientePagina}/>
						<Route path="/registro" component={Registro}/>
					</div>
			  </Router>
      </section>

  );
}

export default App;
