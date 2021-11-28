import { Stack } from "react-bootstrap";
import { useParams } from "react-router";
import AppFoodCarousel from "./AppFoodCarousel";
import AppFoodNutrients from "./AppFoodNutrients";
import AppFoodGallery from "./AppFoodGallery";

const Ingredient = ({ingredientName}) => {
//The argument is from the Recipe page that you clicked
// return (<h1>Your ingredient Name is: {ingredientName}</h1>);
  const { name } = useParams()
  
  return (
    <Stack className="mt-5 text-center" direction="horizontal" gap="3">
      <Stack className="w-75 align-self-start">
        <h4>{name}</h4>
        <AppFoodCarousel name={name} />
        <AppFoodGallery name={name} />
      </Stack>
      <Stack className="w-25">
        <h4>Nutrition Facts</h4>
        <AppFoodNutrients name={name} />
      </Stack>
    </Stack>
  );
}

export default Ingredient;