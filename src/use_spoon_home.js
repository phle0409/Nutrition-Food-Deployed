import {useState, useEffect} from 'react';
import axios from 'axios';

const use_spoon_home = (stateChange=f=>f)=> {
    // let [results, setResults] = useState([]);
    // let [pending, setPending] = useState(true);
    // let [error, setError] = useState(null);
    // let [index, setIndex] = useState(0);

    //use axios to get data from API
   
    let promises = [];
    let responses = [];

    for(let i = 0; i < 10; ++i) {
        promises.push(axios.get(url_array[i]).then((results)=> {
            responses.push(results);
        })
        );
    }

    Promise.allSettled(promises).then((results)=>{
        console.log(`These are my promise results: ${results}`);
        let to_add = JSON.stringify(responses);
        //maybe want to give user disabled sessionStorage?
        sessionStorage.setItem('Home_Page_Array',to_add);
        stateChange(responses);
        console.log(stateChange);
    });
   
    console.log("out of funciton "+index);

    // return {
    //     results,
    //     pending,
    //     error
    // };
};

export default useSpoonacular;