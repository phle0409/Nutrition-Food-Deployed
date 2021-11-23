import { Stack, Table } from "react-bootstrap";
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import useSearchFood from "./useSearchFood";
import { useEffect, useRef, useState } from 'react';

const AppSearchFood = () => {
  const [query, setQuery] = useState("");
  const [selections, setSelections] = useState([]);
  const [totalEnergy, setTotalEnergy] = useState(0);

  const { data, isPending } = useSearchFood(query, 15);
  const filterBy = () => true;
  const ref = useRef();

  const onSelect = (options) => {
    const option = options[0];

    let found = false;
    setSelections(selections.map((selection) => {
      const match = selection.fdcId === option.fdcId;

      found |= match;
      return found
        ? { ...selection, quantity: selection.quantity + 1 }
        : { ...selection }
    }));

    if (!found) {
      const energy = option.foodNutrients.find((nutrient) =>
        nutrient.nutrientName === "Energy" && nutrient.unitName.toLowerCase() === "kcal"
      ).value;

      const selection = {
        fdcId: option.fdcId,
        text: option.description + " - " + option.brandOwner,
        energy: energy,
        quantity: 1
      };

      setSelections(prev => [...prev, selection]);
    }

    ref.current.clear();
  }

  const updateWithQuantity = (event) => {
    setSelections(selections.map((selection) =>
      selection.fdcId === parseInt(event.target.dataset.id)
        ? { ...selection, quantity: parseInt(event.target.value) }
        : { ...selection }
    ));
  }

  useEffect(() => {
    let total = selections
      .map((selection) => {
        let value = selection.energy * selection.quantity;
        return value;
      })
      .reduce((prev, curr) => {
        let value = prev + curr;
        return value;
      }, 0);
    setTotalEnergy(total);
  }, [selections])

  return (
    <Stack>
      <h4 className="mt-5 text-center">Add consumed food</h4>
      <AsyncTypeahead
        id="async-query-food"
        filterBy={filterBy}
        isLoading={isPending}
        labelKey="description"
        minLength={3}
        onSearch={setQuery}
        onChange={onSelect}
        options={data}
        placeholder="Milk, Apple,..."
        renderMenuItemChildren={(option, props) => (
          <span>{option.description} - {option.brandOwner}</span>
        )}
        ref={ref}
      />

      {selections.length > 0 &&
        <Table className="mt-3" striped bordered hover>
          <thead>
            <tr>
              <th className="w-50">Name</th>
              <th className="w-25 text-center">Energy<br />(each 100g/100ml)</th>
              <th className="w-25 text-center">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {selections.map((selection, i) => (
              <tr key={i}>
                <td>{selection.text}</td>
                <td class="text-center">{selection.energy}</td>
                <td class="text-center"><input type="number" data-id={selection.fdcId} value={selection.quantity} min="0"
                  onChange={updateWithQuantity} style={{
                    width: "40px"
                  }} /></td>
              </tr>
            ))}
          </tbody>
        </Table>
      }

      {totalEnergy > 0 &&
        <p>You consumed {totalEnergy} kcal.</p>
      }
    </Stack>
  );
}

export default AppSearchFood;