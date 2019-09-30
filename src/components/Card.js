import React from "react";
import "./style.css";


function Card(props) {
  
  return (
    <div className="col-2 char-card" key={props.id} onClick={() => props.pickedChar(props.value)} style={{cursor: "pointer"}}>
      <img className="char-pic" src={props.photo} alt={props.name}/>
      <h4 className="text-center pb-1">{props.name}</h4>
    </div>
  );
}

export default Card;