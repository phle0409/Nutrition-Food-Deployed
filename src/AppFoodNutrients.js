import { useEffect, useState } from "react";
import { Stack, Table, Alert, Placeholder } from "react-bootstrap";
import useSearchNutrients from "./useSearchNutrients";

const AppFoodNutrients = (props) => {
  const name = props.name;

  const { data, isPending, error, empty } = useSearchNutrients(name);
  const unitNameFormat = (value) => {
    switch (value) {
      case "kJ":
        return "kJ";
      case "J":
        return "J";
      case "UG":
        return "µg";
      default:
        return value.toLowerCase();
    }
  }

  const filterNutrition = () => {
    let resultFilter = null;
    if (data !== null) {
      resultFilter = data.map((nutrient, i) => {
        if (nutrient.nutrientName.toLowerCase().includes('protein') ||
          nutrient.nutrientName.toLowerCase().includes('carb') || nutrient.nutrientName.toLowerCase().includes('lipid')) {
          return (<tr key={i}>
            <td>{nutrient.nutrientName}</td>
            <td>{nutrient.value}</td>
            <td>{unitNameFormat(nutrient.unitName)}</td>
          </tr>)
        }
      })
    }
    console.log(resultFilter)
    return resultFilter;
  }


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
        <p>No nutrients to show.</p>
      }
      {data.length > 0 &&
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="w-50">Name</th>
              <th className="w-25">Amount</th>
              <th className="w-25">Unit</th>
            </tr>
          </thead>
          <tbody>
            {data && filterNutrition()}
          </tbody>
        </Table>
      }
    </Stack>

  );
}

export default AppFoodNutrients;
