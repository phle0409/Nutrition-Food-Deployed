import { Stack, Carousel, Alert, Placeholder } from "react-bootstrap";
import usePixaBay from "./usePixaBay";

const AppFoodCarousel = (props) => {
  const name = props.name;
  const { data, isPending, error, empty } = usePixaBay(name, 3);
  return (
    <Stack>
      {error &&
        <Alert>{error}</Alert>
      }
      {isPending &&
        <Placeholder as="p" animation="glow">
          <Placeholder xs={12} />
        </Placeholder>
      }
      {empty &&
        <p>No photo to show.</p>
      }
      {data.length > 0 &&
        <Carousel variant="dark">
          {data.map((link, i) => (
            <Carousel.Item key={i}>
              <img src={link} alt="Sample" />
            </Carousel.Item>
          ))}
        </Carousel>
      }
    </Stack>
  );
}

export default AppFoodCarousel;