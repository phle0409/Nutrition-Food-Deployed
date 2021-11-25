import { Stack, Form, FloatingLabel, Button } from "react-bootstrap";
import { useState } from "react";

const AppTDEE = (props) => {
  const onTDEE = props.onTDEE;

  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [age, setAge] = useState('')
  const [activityLevel, setActivityLevel] = useState('1')
  const [gender, setGender] = useState('1')


  const calcTDEE = (e) => {
    e.preventDefault();
    let BMR;
    let TDEE;
    if (gender === '1') {
      // Male
      BMR = 66 + (13.7 * parseInt(weight)) + (5 * parseInt(height)) - (6.8 * parseInt(age));
    } else if (gender === '2') {
      // Female
      BMR = 655 + (9.6 * parseInt(weight)) + (1.8 * parseInt(height)) - (4.7 * parseInt(age));
    }

    let activity;
    switch (parseInt(activityLevel)) {
      case 1: activity = 1.2; break;
      case 2: activity = 1.375; break;
      case 3: activity = 1.55; break;
      case 4: activity = 1.725; break;
      case 5: activity = 1.9; break;
      default:
        activity = 1.2;
    }

    TDEE = parseInt(activity * BMR)

    console.log({ height, weight, age, activityLevel, gender })
    console.log({ BMR, activity, TDEE });

    onTDEE(TDEE);
  }

  return (
    <Stack>
      <Form onSubmit={calcTDEE}>
        <FloatingLabel controlId="formInput.height" label="Height (cm)">
          <Form.Control type="number" min="0" placeholder="1" required
            onChange={(e) => setHeight(e.target.value)} />
        </FloatingLabel>
        <FloatingLabel className="mt-3" controlId="formInput.width" label="Weight (kg)">
          <Form.Control type="number" min="0" placeholder="1" required
            onChange={(e) => setWeight(e.target.value)} />
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

        <Stack>
          <Button className="mt-3 align-self-center" type="submit">Calculate</Button>
        </Stack>
      </Form>
    </Stack>
  );
}

export default AppTDEE;