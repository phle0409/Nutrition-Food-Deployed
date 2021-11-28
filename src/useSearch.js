//This function is used as a custom hook, to store and set the necessary info
//related to the search bar

import { useState } from "react";

const useSearch = (initialValue) => {
    //we need two stae variables and functions
    //for controlled input
    let [value, setValue] = useState(initialValue);
    return [{value, onChange: e=>setValue(e.target.value)},
    ()=>setValue(initialValue)];
};

export default useSearch;