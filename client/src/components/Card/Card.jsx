import React from "react";
import './Card.css';

function Card ({name,image,population,continent}) {
   
     let formattedNumber= population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
    return(
        <div id="container-card">
        
            <div id="container-name">
                <h3 id="name-country">{name}</h3>
            </div>
            <div>
                <img id="image-country" alt={`Flag of ${name}`} src={image}/>
                <p>Continent: {continent}</p>
                <p>Population: {formattedNumber}</p>
            </div>
        
        </div>
    )
}

export default Card;