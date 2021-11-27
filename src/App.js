import './App.css';
import HomeImageArray from './HomeImageGrid';
import { useState } from 'react';
import AppNavbar from './AppNavbar';
import Home from './Home';
import MacroCalculator from './MacroCalculator';
import Recipe from './Recipe'
import Ingredient from './Ingredient'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';

function App() {
// let [recipeInfo,setrecipeInfo] = useState(null);
// console.log(`This is my recipe info: ${recipeInfo}`);

  return (
    <Container className="mt-3 mb-3">
      <Router>
        <AppNavbar />
        <div className="content mt-3">
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="/recipe">
              <Recipe  />
            </Route>
            <Route path="/ingredient/:name">
              <Ingredient />
            </Route>
            <Route path="/macro-calculator">
              <MacroCalculator />
            </Route>
          </Switch>
        </div>
      </Router>
    </Container>
  );
}

export default App;
