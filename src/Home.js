import HomeImageArray from './HomeImageGrid';
import {useState} from 'react';
import HomeImageGrid from './HomeImageGrid';
import {Collapse, Image, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import CompareImages from './CompareImages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import "./Compare.css";

const Home = ({setLink=f=>f, column_count=3, compare, setCompare}) => {
  let [my_array, set_my_Array] = useState([]);
  let set_compare =(info)=> {
    let compare_list = compare.map((item)=>item);
    console.log(`Before it is: ${my_array}`);
    compare_list.push(info);
    console.log("This is my list to compare" + compare_list);
    setCompare(compare_list);
  };

  let remove_compare = (index)=> {
    let compare_list = compare.map((item)=>item);
    compare_list.splice(index,1);
    setCompare(compare_list);
  };

  console.log(`Here is my array length int start of Home: ${JSON.parse(sessionStorage.getItem("Home_Page_Array")).length}`)

  return (
    <div>
    <HomeImageGrid 
    stateChange={(array)=>{
      set_my_Array(array);
    }} 
    setLink={setLink}
    columnCount={column_count}
    toCompare={set_compare}
    compare={compare}
    />
    <Collapse in={compare.length > 0 ? true : false}>
        <div className="fixed-bottom d-flex justify-content-center bottom-box bg-light align-items-center">
        {
          compare.map((item,index)=> {
            return(
            <div>
            <Image key={index} className="image-sizing" src={item.data.results[0].image}/>
            <Button variant="danger" onClick={()=>remove_compare(index)} >
            <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
            </div>
            );
          })
        }
        {compare.length > 1 &&
        <Link to="/compare" id="compare-margin">
        <Button variant="info">Compare</Button>
        </Link>
        }
      </div>
    </Collapse>
    </div>
  );
}

export default Home;