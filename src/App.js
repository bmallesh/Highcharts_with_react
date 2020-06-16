import React from 'react';
import './App.css';
import { BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import Nav from './Components/Nav/Nav'
import ChartComponent from './Components/ChartComponent/ChartComponent';
import CoronaChart from './Components/coronaChartComponent/coronaChartComponent';
import Home from './Components/HomeComponent/HomeComponent'

function App() {
  return (
    <Router>
      
    <div className="App">
      <Nav/>
      <Switch>
      <Route path="/"exact component={Home}/>
      <Route path="/chart" component={ChartComponent}/>
      <Route path="/coronaChart" component={CoronaChart}/>
      </Switch>
    </div>
    
    </Router>
  );
}

export default App;
