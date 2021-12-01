import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, ListGroup, Table, Form, FormControl, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import "./Recipe.css";


const RecipeBody = ({info, changeIngredient=f=>f, showButton=false, forcompare=false}) => {
    let ingredients = info.data.results[0].nutrition.ingredients;
    let recipe_steps_arr=info.data.results[0].analyzedInstructions[0].steps;
    let nutrients_array = info.data.results[0].nutrition.nutrients;
    console.log(nutrients_array);
    let recipe_steps = recipe_steps_arr.map((item)=>{
        return item.step;
    });
    let ingredients_arr = ingredients.map((item)=>{
      return item.name;
    });

    return (
    <Container fluid>

    <Row className="p-10">
      <Col></Col>
      <Col xs={12} md={6} className="d-flex justify-content-center"> 
    <img className="w-100" src={info.data.results[0].image} alt="food"/>
       </Col> 
       <Col></Col>
    </Row>
    { showButton &&
    <Row>
      <Col></Col>
    <Col xs={12} sm={6}>
        {/* <Form> */}
          {/* <Form.Check type="checkbox">
            <Form.Check.Input type="checkbox" isValid />
            <Form.Check.Label className="button-margin">Add to Home Page</Form.Check.Label>
          </Form.Check>
        </Form> */}
        <Link to="/">
        <Button 
        variant="outline-success"
        onClick={()=>
        { //setAdd(true)
          let homepage = sessionStorage.getItem("Home_Page_Array");
          let old_home = JSON.parse(homepage);
          old_home.unshift(info);
          let new_home = JSON.stringify(old_home);
          sessionStorage.setItem("Home_Page_Array",new_home);
        }
        }>
          Add To HomePage
        </Button>
        </Link>
      </Col>
    <Col></Col>
    </Row>  
    }    
      
    <Row>
      <Col sm={2}>
      </Col>
      <Col xs={12} md={8} className="d-flex justify-content-center" >
        <h1 className="text-center">{info.data.results[0].title}</h1>
      </Col>
      <Col>
      </Col>
    </Row> 
  {forcompare===false &&
    <Row>
      <Col xs={12} md={4}>
      <Card className="w-100">
      <Card.Body>
        <Card.Header>Ingredients</Card.Header>
        <ListGroup variant="flush">
        {
        ingredients_arr.map((item,index)=>{
        return(<ListGroup.Item key={index} action onClick={()=>changeIngredient(item)}>
          <Link to={`/ingredient/${item}`}>
          {item}
          </Link>
          </ListGroup.Item>);
        })
        }      
        </ListGroup>
      </Card.Body>
      </Card>
      </Col>
   
    <Col xs={12} md={4}>

        <Card className="w-100">
          <Card.Title>Recipe</Card.Title>
          <Card.Subtitle>Steps</Card.Subtitle>
          <ListGroup variant="flush">
            {
            recipe_steps.map((item, index) => {
            return(<ListGroup.Item key={index}>{item}</ListGroup.Item>)
            })
            }
          </ListGroup>

        </Card>
        </Col>
      <Col xs={12} md={4}>
        <Card className="w-100">
            <Table>
              <thead>
                <tr>
                  <th>Nutrient</th>
                  <th>Amount(units)</th>
                </tr>
              </thead>
              <tbody>
              {
                nutrients_array.map((item,index) => {
                return(<tr key={index}>   
                  <td>{item.name}</td>
                  <td>{item.amount}({item.unit})</td>
                </tr>)
                })
              }
              </tbody>
            </Table>
        </Card>
      </Col>
    </Row>
}
{
    forcompare===true &&
       <Row>
      <Col xs={12}>
      <Card className="w-100">
      <Card.Body>
        <Card.Header>Ingredients</Card.Header>
        <ListGroup variant="flush">
        {
        ingredients_arr.map((item,index)=>{
        return(<ListGroup.Item key={index} action onClick={()=>changeIngredient(item)}>
          <Link to={`/ingredient/${item}`}>
          {item}
          </Link>
          </ListGroup.Item>);
        })
        }      
        </ListGroup>
      </Card.Body>
      </Card>
      </Col>
   
    <Col xs={12}>

        <Card className="w-100">
          <Card.Title>Recipe</Card.Title>
          <Card.Subtitle>Steps</Card.Subtitle>
          <ListGroup variant="flush">
            {
            recipe_steps.map((item, index) => {
            return(<ListGroup.Item key={index}>{item}</ListGroup.Item>)
            })
            }
          </ListGroup>

        </Card>
        </Col>
      <Col xs={12}>
        <Card className="w-100">
            <Table>
              <thead>
                <tr>
                  <th>Nutrient</th>
                  <th>Amount(units)</th>
                </tr>
              </thead>
              <tbody>
              {
                nutrients_array.map((item,index) => {
                return(<tr key={index}>   
                  <td>{item.name}</td>
                  <td>{item.amount}({item.unit})</td>
                </tr>)
                })
              }
              </tbody>
            </Table>
        </Card>
      </Col>
    </Row> 
}
</Container>
);
}

export default RecipeBody;