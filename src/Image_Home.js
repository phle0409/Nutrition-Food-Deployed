import "./ImageHome.css";
import { Link } from 'react-router-dom';

function ImageHome({setLink, info, src, key, alt}) {
    console.log(`I am in the image definition
    and the data is
    ${info.data.results[0].image}
    `);
    return(
        <Link
        to='/recipe'
        >
        <figure onClick={()=>setLink(info)}>
            <img className="col-img" src={src} key={key} alt={alt} />
                <figcaption>{alt}</figcaption>
        </figure>
        </Link>
    );
}

export default ImageHome;