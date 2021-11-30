import HomeImageArray from './HomeImageGrid';
import {useState} from 'react';
import HomeImageGrid from './HomeImageGrid';

const Home = ({setLink=f=>f, column_count=3}) => {
  let [my_array, set_my_Array] = useState([]);
  //let image_array = sessionStorage.getItem('HomePageArray');


  return (
    <HomeImageGrid 
    stateChange={(array)=>{
      set_my_Array(array);
    }} 
    setLink={setLink}
    columnCount={column_count}
    />
  );
}

export default Home;