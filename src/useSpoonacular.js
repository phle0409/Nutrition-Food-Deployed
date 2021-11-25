import {useState, useEffect} from 'react';

const useSpoonacular = (url_array)=> {
    let [results, setResults] = useState([]);
    let [pending, setPending] = useState(true);
    let [error, setError] = useState(null);
    let url = url_array[0];
    useEffect(()=>{
        setPending(true);
        fetch(url)
        .then((res)=> {
            if(!res.ok) {
                throw Error('could not fetch data');
            }
            return res.json();
        })
        .then((data)=> {
            console.log(data);
            setResults((arr)=> {
                arr.push(data);
                return arr;
            });
            setPending(false);
            setError(null);
        })
        .catch((err)=> {
            setError(err.message);
            setPending(false);
        })
    }, [url]);

    // for(let i = 1; i < 10; ++i) {
    //     url = url_array[i];
    // }
   
    return {
        results,
        pending,
        error
    };
};

export default useSpoonacular;