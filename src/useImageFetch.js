import { createClient } from 'pexels';
import { useState, useEffect } from 'react';

const useImageFetch = (query) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const client = createClient('563492ad6f917000010000019f9d4b4e182c41da810a05c286222a05');
    client.photos.search({query, per_page: 1})
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

  }, [query]);

  return {
    data,
    isPending,
    error,
  };
};

export default useImageFetch;