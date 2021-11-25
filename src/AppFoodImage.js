import usePixaBay from "./usePixaBay";
import { Placeholder, Figure, Col, Stack } from "react-bootstrap";
import { run as runHolder } from 'holderjs/holder';
import { useEffect } from 'react';

const AppFoodImage = (props) => {
  useEffect(() => {
    runHolder('image-holder');
  });

  const name = props.name;
  const { data, isPending, empty } = usePixaBay(name, 3)

  return (
    <>
      {isPending &&
        <Col>
          <Placeholder as="p" animation="glow">
            <Placeholder xs={12} />
          </Placeholder>
        </Col>
      }

      {/* {empty &&
        <Col>
          <Stack>
            <Figure>
              <Figure.Image className="image-holder" src="holder.js/100px180?text=No%20Image" thumbnail />
              <Figure.Caption>{name}</Figure.Caption>
            </Figure>
          </Stack>
        </Col>
      } */}

      {data.length > 0 &&
        <Col>
          <Stack>
            <Figure>
              <Figure.Image src={data[0]} thumbnail style={{
                height: "180px",
                width: "auto",
                objectFit: "cover"
              }} />
              <Figure.Caption>{name}</Figure.Caption>
            </Figure>
          </Stack>
        </Col>
      }

    </>
  );
}

export default AppFoodImage;