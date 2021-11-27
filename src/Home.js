import HomeImageArray from './HomeImageGrid';
import {useState} from 'react';
import HomeImageGrid from './HomeImageGrid';

const Home = ({setLink=f=>f}) => {
  let [my_array, set_my_Array] = useState([]);
  //let image_array = sessionStorage.getItem('HomePageArray');


  return (
    <HomeImageGrid 
    stateChange={(array)=>{
      set_my_Array(array);
    }} 
    setLink={setLink}
    />
  );
}

export default Home;