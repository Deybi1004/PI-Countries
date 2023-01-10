import React,{ useState} from "react";
import { useDispatch } from "react-redux";
import { countryFind } from "../../actions/actions"
import './SearchBar.css';

function SearchBar({setCurrentPage}) {

    const dispatch= useDispatch();
    const [name, setName]= useState('');

    //Busca los nombres por cada cambio que se hace 
    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
        //console.log(e.target.value);
      
        dispatch(countryFind(e.target.value))
        setCurrentPage(1)
       
    }

    // el setName guarda los cambios en name para poder hacer la búsqueda en search del valor completo
    const handleClick= (e) =>{
        e.preventDefault();
       // console.log(name)

         dispatch(countryFind(name)) 
       
    }
  
    return (
    <>
         <input id="search-input" type="text" autoComplete="off" placeholder="   Search..." onChange={e => handleInputChange(e)}/>
        <button id="search-button"type="submit" onClick={e =>handleClick(e)}>🔎</button> 
        
    </>
  )
}

export default SearchBar