import { useState, useEffect } from 'react';

const usePixaBay = (query, count) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [empty, setEmpty] = useState(false);

  if (count < 3) {
    count = 3; // minimum required by PixaBay
  }

  useEffect(() => {
    const API_KEY = '24408638-26cdd708596774f885af10e46';
    const abortController = new AbortController();
    const url = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent(query)
      + "&per_page=" + count + "&category=food";

    fetch(url, { signal: abortController.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error('Could not fetch the data');
        }
        return res.json();
      })
      .then((res) => {
        let data = res.hits.map((photo) => {
          return photo.webformatURL;
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
  }, [query, count]);

  return {
    data,
    isPending,
    error,
    empty
  };
};

export default usePixaBay;