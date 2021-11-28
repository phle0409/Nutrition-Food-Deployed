import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Recipe = ({info, changeIngredient=f=>f}) => {
  if(info != null) {
    if(info.data.totalResults === 0) {
      return (<h1>No Results were found for your search</h1>);
    }
    let ingredients = info.data.results[0].nutrition.ingredients;
    let recipe_steps_arr=info.data.results[0].analyzedInstructions[0].steps;
    let ingredients_needed = info.data.results[0].analyzedInstructions[0];
    let recipe_steps = recipe_steps_arr.map((item)=>{
        return item.step;
    });
    let ingredients_arr = ingredients.map((item)=>{
      return item.name;
    });
    //if totalResults = 0, return a message about that
    return (
      <Container fluid>

        <Row className="p-10">
          <Col></Col>
          <Col xs={12} md={6} className="d-flex justify-content-center"> 
        <img className="w-100" src={info.data.results[0].image} alt="food"/>
           </Col> 
           <Col></Col>
        </Row>
        <Row>
          <Col>
          </Col>
          <Col xs={12} md={8} className="d-flex justify-content-center" >
            <h1 className="text-center">{info.data.results[0].title}</h1>
          </Col>
          <Col></Col>
        </Row>        
        <Row>
          <Col>
          <Card className="w-100">
          <Card.Body>
            <Card.Header>Ingredients</Card.Header>
            <ListGroup variant="flush">
            {
            ingredients_arr.map((item,index)=>{
            return(<ListGroup.Item key={index} action onClick={()=>changeIngredient(item)}>
              <Link to="/ingredient">
              {item}
              </Link>
              </ListGroup.Item>);
            })
            }      
            </ListGroup>
          </Card.Body>
          </Card>
          </Col>
       
        <Col xs={12} md={8}>
          <Row>
            <Col xs={8}>
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
            <Col>
            <Card className="w-100">

            </Card>
            </Col>
          </Row>  
        </Col>
        </Row>
    </Container>
    );
  }
  else {
    return (<h1>Please return to homepage</h1>);
  }
}

export default Recipe;