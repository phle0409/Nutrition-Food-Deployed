import { Row, Stack, Alert, Placeholder } from "react-bootstrap";
import AppFoodImage from "./AppFoodImage";
import useSearchByIngredient from "./useSearchByIngredient";

const AppFoodGallery = (props) => {
  const name = props.name;
  const { data, isPending, error, empty } = useSearchByIngredient(name, 3);

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
          {data.map((name, i) => (
            <AppFoodImage name={name} key={i} />
          ))}
        </Row>
      }
    </Stack>
  );
}

export default AppFoodGallery;