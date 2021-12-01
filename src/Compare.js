import RecipeBody from "./RecipeBody";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Container, Col} from "react-bootstrap";

export default function Compare({compare}) {
    return(
    <div>
    <Container>
        <Row>      
      
        {
    compare.map((item, index)=> {
        return(
        <Col>
        <RecipeBody key={index} info={item} forcompare={true} />
        </Col>
        )
    })
    }
        </Row>
    </Container>    
    </div>
    );
}