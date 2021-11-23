import { Stack, Form, FloatingLabel, Col, Row, Button } from "react-bootstrap";
import { useState } from "react";

const AppTDEE = (props) => {
  const onTDEE = props.onTDEE;

  const [height, setHeight] = useState('')
  const [width, setWidth] = useState('')
  const [age, setAge] = useState('')
  const [activityLevel, setActivityLevel] = useState('1')
  const [gender, setGender] = useState('1')
  const [bodyFat, setBodyFat] = useState('')


  const calcTDEE = (e) => {
    e.preventDefault();

    console.log({ height, width, age, activityLevel, gender, bodyFat })

    onTDEE(height)
  }

  return (
    <Stack>
      <Form onSubmit={calcTDEE}>
        <FloatingLabel controlId="formInput.height" label="Height">
          <Form.Control type="number" min="0" placeholder="1" required
            onChange={(e) => setHeight(e.target.value)} />
        </FloatingLabel>
        <FloatingLabel className="mt-3" controlId="formInput.width" label="Width">
          <Form.Control type="number" min="0" placeholder="1" required
            onChange={(e) => setWidth(e.target.value)} />
        </FloatingLabel>
        <FloatingLabel className="mt-3" controlId="formInput.age" label="Age">
          <Form.Control type="number" min="0" placeholder="1" required
            onChange={(e) => setAge(e.target.value)} />
        </FloatingLabel>
        <FloatingLabel className="mt-3" controlId="formInput.activityLevel" label="Activity">
          <Form.Select
            onChange={(e) => setActivityLevel(e.target.value)}>
            <option value="1">Sedentary</option>
            <option value="2">Light Exercise (1-2 days per week)</option>
            <option value="3">Moderate (3-5 days per week)</option>
            <option value="4">Heavy (6-7 days per week)</option>
            <option value="5">Athlete (2x per day)</option>
          </Form.Select>
        </FloatingLabel>
        <Stack direction="horizontal" className="mt-3" key="inline-radio">
          <Form.Check inline type="radio" label="Male" required value="1" name="formInput.gender"
            onChange={(e) => setGender(e.target.value)} />
          <Form.Check inline type="radio" label="Female" required value="2" name="formInput.gender"
            onChange={(e) => setGender(e.target.value)} />
        </Stack>
        <Row>
          <Col md={6}>
            <FloatingLabel className="mt-3 d-block mx-auto" controlId="formInput.bodyFat" label="Body Fat">
              <Form.Control type="number" min="0" max="100" placeholder="1" required
                onChange={(e) => setBodyFat(e.target.value)} />
            </FloatingLabel>
          </Col>
        </Row>

        <Stack>
          <Button className="mt-3 align-self-center" type="submit">Calculate</Button>
        </Stack>
      </Form>
    </Stack>
  );
}

export default AppTDEE;