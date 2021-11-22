import './App.css';
import AppNavbar from './AppNavbar';
import Home from './Home';
import MacroCalculator from './MacroCalculator';
import Recipe from './Recipe'
import Ingredient from './Ingredient'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container className="mt-3 mb-3">
      <Router>
        <AppNavbar />
        <div className="content mt-3">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/recipe/:id">
              <Recipe />
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
