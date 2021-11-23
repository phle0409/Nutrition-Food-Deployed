import { Stack } from "react-bootstrap";
import AppSearchFood from "./AppSearchFood";
import AppTDEE from "./AppTDEE";
import { useState } from "react";

const MacroCalculator = () => {
  const [tdee, setTDEE] = useState('TBD')

  return (
    <div>
      <h4>Total Daily Energy Expenditure(TDEE)</h4>
      <Stack direction="horizontal" gap={3}>
        <Stack className="border p-3 align-self-start w-50">
          <AppTDEE onTDEE={setTDEE} />
        </Stack>

        <Stack className="align-self-start w-50">
          <Stack className="border p-3 text-center">
            <h4>Maintenance Calories</h4>
            <h4 style={{
              color: "red"
            }}>{tdee}</h4>
            <h4>Calories per day</h4>
          </Stack>

          <AppSearchFood />
        </Stack>
      </Stack>
    </div>
  );
}

export default MacroCalculator;