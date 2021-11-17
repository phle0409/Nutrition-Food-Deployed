import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortContoller = new AbortController();

    fetch(url, { singnal: abortContoller.singal })
      .then((res) => {
        if (!res.ok) {
          throw Error('Could not fetch the data');
        }
        return res.json();
      })
      .then((responeData) => {
        setData(responeData);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('Aborted');
        } else {
          setError(err.message);
          setIsPending(false);
        }
      });

    return () => abortContoller.abort();
  }, []);

  return {
    data,
    isPending,
    error,
  };
};

export default useFetch;