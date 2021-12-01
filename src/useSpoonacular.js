import { useState, useEffect } from 'react';

const useSpoonacular = (ingredient, count) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    const API_KEY = '512a6c36ad624fbf89471ffccafe02f0';
    const abortController = new AbortController();
    const url = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + API_KEY
      + "&ingredients=" + encodeURIComponent(ingredient)
      + "&number=" + count;

    fetch(url, { signal: abortController.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error('Could not fetch the data');
        }
        return res.json();
      })
      .then((res) => {
        let data = res;

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

export default useSpoonacular;