import "./ImageHome.css";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from "react-bootstrap";
import HomeCard from "./Home_Card";

function ImageHome({setLink, info, src, alt, toCompare, compare, index, setRemoved=f=>f}) {
    console.log(`I am in the image definition
    and the data is
    ${info.data}
    `);
    return(
        // <Link
        // to='/recipe'
        // >
        // <Card onClick={()=>setLink(info)}>
        //     <Card.Img className="col-img" src={src} key={key} alt={alt} />
        //         <figcaption>{alt}</figcaption>
        // </Card>
        <HomeCard setRemoved={setRemoved} index={index} compare={compare} setCompare={toCompare} src={src} alt={alt} info={info} setLink={setLink} />
        // </Link>
    );
}

export default ImageHome;