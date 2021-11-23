import { useState, useEffect } from 'react';

const useSearchNutrients = (name) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    const API_KEY = 'tUczyHuY9sF4hO3Ndv4LQbQcwO1xU3ounwk9pbsc';
    const abortController = new AbortController();
    const url = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=" + API_KEY
      + "&query=" + encodeURIComponent(name)
      + "&pageSize=1&dataType=SR%20Legacy";

    fetch(url, { signal: abortController.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error('Could not fetch the data');
        }
        return res.json();
      })
      .then((res) => {
        if (res.foods.length === 0) {
          setEmpty(true);
          setData([]);
          setIsPending(false);
          setError(null);
        } else {
          setEmpty(false)
          setData(res.foods[0].foodNutrients.filter((nutrient) => nutrient.value > 0));
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
  }, [name]);

  return {
    data,
    isPending,
    error,
    empty
  };
};

export default useSearchNutrients;