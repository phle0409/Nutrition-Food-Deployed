import {useState, useEffect} from 'react';

const useSpoonacular = (url_array)=> {
    let [results, setResults] = useState([]);
    let [pending, setPending] = useState(true);
    let [error, setError] = useState(null);
    let [index, setIndex] = useState(0);
    useEffect(()=>{
        setPending(true);
        console.log(`fetch request url: ${url_array[index]}`);
        fetch(url_array[index])
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
    }, []);
    console.log("out of funciton "+index);
    // for(let i = 1; i < 10; ++i) {
    //     url = url_array[i];
    // }
    
    if(index < 10) {
        setIndex(index + 1);
    }
   
    return {
        results,
        pending,
        error
    };
};

export default useSpoonacular;