//used to show image/expand on hover
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Collapse, Button} from "react-bootstrap";
import { useState } from "react";

export default function HomeCard({setLink, info, src, key, alt}) {
    let [open, setOpen] = useState(false);

    return(
        <Card onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>
            <Card.Img className="col-img" src={src} key={key} alt={alt} />
            <Collapse in={open}>
                <Card.Body className="active">
                    <Card.Title>{alt}</Card.Title>
                    <Button className="btn-success">Compare</Button>
                    <Button onClick={()=>setLink(info)} className="btn-primary">Info</Button>
                </Card.Body>
            </Collapse>
        </Card>
    );
}


