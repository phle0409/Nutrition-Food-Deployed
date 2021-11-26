import HomeImageArray from './HomeImageArray';
import {useState} from 'react';
import HomeImageGrid from './HomeImageArray';

const Home = () => {
  let [my_array, set_my_Array] = useState([]);
  //let image_array = sessionStorage.getItem('HomePageArray');


  return (
    <HomeImageGrid 
    stateChange={(array)=>{
      set_my_Array(array);
    }} 
    />
  );
}

export default Home;