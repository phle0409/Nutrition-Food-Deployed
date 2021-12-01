//used to show image/expand on hover
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Collapse, Button, Overlay, Tooltip} from "react-bootstrap";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function HomeCard({setLink, setCompare, info, src, key, alt, compare, index, setRemoved}) {
    let [open, setOpen] = useState(false);
    let target = useRef(null);
    let [warning, setWarning] = useState(false);
    return(
        <Card onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>
            <Card.Img className="col-img" src={src} key={key} alt={alt} />
            <Collapse in={open}>
                <Card.Body className="active">
                    <Card.Title>{alt}</Card.Title>
                    <Button
                    ref={target} 
                    onMouseOut={()=>setWarning(false)}
                    onClick={()=>{
                        if(compare.length < 2)
                            setCompare(info);
                        else {
                            //I want a tooltip
                            setWarning(true);
                        }
                        setLink(info);
                    }} 
                    className="btn-success">
                        Compare
                    </Button>
                    <Overlay target={target.current} show={warning} placement="bottom">
                        {(props)=> {
                            return(
                                <Tooltip {...props} >
                                    Only two recipes are permitted
                                </Tooltip>
                            );
                        }}
                    </Overlay>
                    <Link to="/recipe">
                    <Button onClick={()=>setLink(info)} className="btn-primary">Info</Button>

                    </Link>
                    <Button onClick={()=>{
                        let array = sessionStorage.getItem("Home_Page_Array");
                        let decoded_array = JSON.parse(array);
                        decoded_array.splice(index,1);
                        let put_back = JSON.stringify(decoded_array);
                        sessionStorage.setItem("Home_Page_Array",put_back);
                        setRemoved();
                    }} 
                    className="btn-danger">
                        Remove
                    </Button>                 
                </Card.Body>
            </Collapse>
        </Card>
    );
}


