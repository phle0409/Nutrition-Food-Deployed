import { useState, useEffect } from 'react';

const useSearchFood = (name, count) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    setIsPending(true)
    const API_KEY = 'tUczyHuY9sF4hO3Ndv4LQbQcwO1xU3ounwk9pbsc';
    const abortController = new AbortController();
    const url = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=" + API_KEY
      + "&query=" + encodeURIComponent(name)
      + "&pageSize=" + count + "&dataType=Branded";

    fetch(url, { signal: abortController.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error('Could not fetch the data');
        }
        return res.json();
      })
      .then((res) => {
        let data = res.foods.filter((food) =>
          food.foodNutrients.filter((nutrient) =>
            nutrient.nutrientName === "Energy" && nutrient.unitName.toLowerCase() === "kcal"
          ).length > 0
        );

        if (data.length === 0) {
          setEmpty(true);
          setData([]);
          setIsPending(false);
          setError(null);
        } else {
          setEmpty(false)
          setData(data);
          setIsPending(false);
          setError(null);
        }
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('Aborted');
        } else {
          setError(err.message);
          setIsPending(false);
        }
      });

    return () => abortController.abort();
  }, [name, count]);

  return {
    data,
    isPending,
    error,
    empty
  };
};

export default useSearchFood;