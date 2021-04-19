import  React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import NavBar  from './components/layout/navbar/navbar';
import Dashboard from './components/layout/dashboard/dashboard';
import PokeInfo from './components/pokemon/PokeInfo';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/pokemon/:pokeIndex" component={PokeInfo} />
          </Switch>
        </div> 

      </div>
    </Router>
  );
}

export default App;
