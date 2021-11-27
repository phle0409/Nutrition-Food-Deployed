import {useState, useEffect} from 'react';
import axios from 'axios';

const use_spoon_home = (url_array, stateChange=f=>f)=> {
    // let [results, setResults] = useState([]);
    // let [pending, setPending] = useState(true);
    // let [error, setError] = useState(null);
    // let [index, setIndex] = useState(0);

    //use axios to get data from API
   
    let promises = [];
    let responses = [];

    for(let i = 0; i < 12; ++i) {
        promises.push(axios.get(url_array[i]).then((results)=> {
            responses.push(results);
        })
        );
    }

    Promise.allSettled(promises).then((results)=>{
        console.log(`These are my promise results: ${results}`);
        
        //maybe want to give user warning disabled sessionStorage?
        //want to remove the items with 0 total_Results
        let full_items = responses.filter((item)=> {
            return (item.status === 200 && item.data.totalResults > 0);
        });
        let to_add = JSON.stringify(full_items);
        sessionStorage.setItem('Home_Page_Array',to_add);
        stateChange(full_items);
    });
   


    // return {
    //     results,
    //     pending,
    //     error
    // };
};

export default use_spoon_home;