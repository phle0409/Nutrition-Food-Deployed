import { useState, useEffect } from 'react';
import { createClient } from 'pexels';

const usePexel = (query, count) => {
  const API_KEY = '563492ad6f91700001000001c8f2a22b6c774939a8546d27856b2572';

  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    const client = createClient(API_KEY);
    const abortController = new AbortController();

    client.photos.search({ query, per_page: count })
      .then(res => {
        let data = res.photos.map((photo) => {
          return photo.src.medium;
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
          console.log(err);
          setError("Fail to load");
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

export default usePexel;