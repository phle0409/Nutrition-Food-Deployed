import { Row, Col, Figure, Stack, Alert, Placeholder } from "react-bootstrap";
import useSpoonacular from "./useSpoonacular";

const AppSpoonacularFoodGallery = (props) => {
  const name = props.name;
  const { data, isPending, error, empty } = useSpoonacular(name, 3);

  return (
    <Stack>
      <h4 className="mt-5">Recipe</h4>
      {error &&
        <Alert>{error}</Alert>
      }
      {isPending &&
        <Placeholder as="p" animation="glow">
          <Placeholder xs={12} />
        </Placeholder>
      }
      {empty &&
        <p>No recipe to show.</p>
      }
      {data.length > 0 &&
        <Row>
          {data.map((recipe, i) => (
            <Col key={i}>
              <Stack>
                <Figure>
                  <Figure.Image src={recipe.image} thumbnail style={{
                    height: "180px",
                    width: "auto",
                    objectFit: "cover"
                  }} />
                  <Figure.Caption>{recipe.title}</Figure.Caption>
                </Figure>
              </Stack>
            </Col>
          ))}
        </Row>
      }
    </Stack>
  );
}

export default AppSpoonacularFoodGallery;