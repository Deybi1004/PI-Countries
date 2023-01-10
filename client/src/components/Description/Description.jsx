import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesId } from "../../actions/actions";
import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";
import "./Description.css";
import CardActivity from "../CardActivities/CardActivities";
import Loader from "../Loader/Loader";

function Description(prop) {
  //console.log(prop.match.params.id)

  const dispatch = useDispatch();
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    dispatch(getCountriesId(prop.match.params.id));
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [dispatch, prop.match.params.id]);

  const country = useSelector((state) => state.countryId);
  //console.log(country.activities);

  
    if(loading){
      return(
      <div className="container-loading-description">
       <Loader/>
      </div>
      )
    }else {
      return (
      <div className="container-details">
      {/* Nav => Home */}

      <div className="container-link-home">
        <Link className="link-home" to="/countries">
          <Nav />
        </Link>
      </div>

      <h1 className="container-name">{country.name}</h1>
      {/* Container Description */}
      <div className="container-description-country">
        <div className="description-image">
          <img
            className="container-image"
            alt={`${country.name} Flag`}
            src={country.image}
          />
        </div>
        <div className="description-info">
          <h3 className="description-capital">Capital : {country.capital}</h3>
          <h3 className="description-continent">
            Continent: {country.continent}
          </h3>
          <h4 className="description-region">
            Sub-region: {country.subregion}
          </h4>
        </div>
        <div className="description-numbers">
          <h4 className="description-area">
            Area:{" "}
            {country?.area?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
            km²
          </h4>
          <h4 className="description-population">
            Population :{" "}
            {country?.population
              ?.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </h4>
        </div>
      </div>
      <div className="container-activities">
        <CardActivity
          className="card-activity"
          activities={country.activities}
        />
      </div>
    </div>
    );
    }
    
}

export default Description;
