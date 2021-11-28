import { Stack } from "react-bootstrap";
import AppFoodCarousel from "./AppFoodCarousel";
import AppFoodNutrients from "./AppFoodNutrients";
import AppFoodGallery from "./AppFoodGallery";

const Ingredient = ({ ingredientName }) => {
  //The argument is from the Recipe page that you clicked

  return (
    <Stack className="mt-5 text-center" direction="horizontal" gap="3">
      <Stack className="w-75 align-self-start">
        <h4>{ingredientName}</h4>
        <AppFoodCarousel name={ingredientName} />
        <AppFoodGallery name={ingredientName} />
      </Stack>
      <Stack className="w-25">
        <h4>Nutrition Facts</h4>
        <AppFoodNutrients name={ingredientName} />
      </Stack>
    </Stack>
  );
}

export default Ingredient;