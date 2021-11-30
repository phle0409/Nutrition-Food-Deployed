import "./ImageHome.css";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Button } from "react-bootstrap";
import HomeCard from "./Home_Card";

function ImageHome({setLink, info, src, key, alt}) {
    console.log(`I am in the image definition
    and the data is
    ${info.data.results[0].image}
    `);
    return(
        // <Link
        // to='/recipe'
        // >
        // <Card onClick={()=>setLink(info)}>
        //     <Card.Img className="col-img" src={src} key={key} alt={alt} />
        //         <figcaption>{alt}</figcaption>
        // </Card>
        <HomeCard src={src} key={key} alt={alt} />
        // </Link>
    );
}

export default ImageHome;