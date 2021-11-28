import usePixaBay from "./usePixaBay";
import { Placeholder, Figure, Col, Stack } from "react-bootstrap";
import { run as runHolder } from 'holderjs/holder';
import { useEffect } from 'react';
import usePexel from "./usePexel";

const AppFoodImage = (props) => {
  useEffect(() => {
    runHolder('image-holder');
  });

  const name = props.name;
  const { data, isPending, empty } = usePixaBay(name, 3)

  const filterEmptyImage = () => {
    if (empty) {
      return <Col>
        <Stack>
          <Figure>
            <Figure.Image className="image-holder" src="holder.js/100px180?text=No%20Image" thumbnail />
            <Figure.Caption>{name}</Figure.Caption>
          </Figure>
        </Stack>
      </Col>
    } else {
      return < Col >
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
  }

  return (
    <>
      {isPending &&
        <Col>
          <Placeholder as="p" animation="glow">
            <Placeholder xs={12} />
          </Placeholder>
        </Col>
      }

      {data.length > 0 && filterEmptyImage()}

    </>
  );
}

export default AppFoodImage;