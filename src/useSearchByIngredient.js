import { useState, useEffect } from 'react';

const useSearchByIngredient = (ingredient, count) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    const API_KEY = 'tUczyHuY9sF4hO3Ndv4LQbQcwO1xU3ounwk9pbsc';
    const abortController = new AbortController();
    const url = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=" + API_KEY
      + "&ingredients=" + encodeURIComponent(ingredient)
      + "&pageSize=" + count + "&dataType=Branded";

    fetch(url, { signal: abortController.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error('Could not fetch the data');
        }
        return res.json();
      })
      .then((res) => {
        let data = res.foods.map((food) => {
          return food.description;
        });

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
  }, [ingredient, count]);

  return {
    data,
    isPending,
    error,
    empty
  };
};

export default useSearchByIngredient;