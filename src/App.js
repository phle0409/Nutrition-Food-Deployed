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
  //passed into Home, so image click will convey the necessary info
  //also passed into Recipe, which displays the info
  let [recipeInfo, setrecipeInfo] = useState(null);
  //let [recipeSearched, setRecipeSearched] = useState(false);
  let [ingredientName, setIngredientName] = useState("");
  return (
    <Container className="mt-3 mb-3">
      <Router>
        <AppNavbar changeRecipe={(recipe) => setrecipeInfo(recipe)} />
        <div className="content mt-3">
          <Switch>
            <Route exact path="/">
              <Home setLink={(info)=>setrecipeInfo(info)} column_count={3} />
            </Route>
            <Route path="/recipe">
              <Recipe
                info={recipeInfo}
                changeIngredient={(ingredient) => setIngredientName(ingredient)} />
            </Route>
            <Route path="/ingredient/">
              <Ingredient ingredientName={ingredientName} />
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
