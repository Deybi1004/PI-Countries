import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//actions
import {
  getCountries,
  getDbActivities,
  sortByPopulation,
  sortByCountries,
  filterByActivity,
  filterByContinent,
} from "../../actions/actions";
//componentes
import Card from "../Card/Card";
import Page from "../Page/Page.jsx";
import Loader from "../Loader/Loader";
import SearchBar from "../SearchBar/SearchBar";
import "./Home.css";
import Header from "../Header/Header";




function Home() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const allCountries = useSelector((state) => state.countries);
  const allActivities = useSelector((state) => state.activities);
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  const indexOfLastCountrie = currentPage * countriesPerPage;
  const indexOfFirstCountrie = indexOfLastCountrie - countriesPerPage;

  const currentCountries =
    currentPage === 1
      ? allCountries.slice(0, 9)
      : allCountries.slice(indexOfFirstCountrie, indexOfLastCountrie);

  useEffect(() => {
    //dispatch(getCountries());
    dispatch(getCountries());
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDbActivities());
    //console.log(allActivities);
  }, [dispatch]);

  const page = (pageNumb) => {
    setCurrentPage(pageNumb);
  };

  //Sort
  const handleSortByCountrie = (e) => {
    e.preventDefault();
    dispatch(sortByCountries(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
    //console.log(e.target.value)
    //console.log(allCountries())
  };

  const handleSortByPopulation = (e) => {
    e.preventDefault();
    dispatch(sortByPopulation(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
  };
  //Filter
  const handleFilterByContinent = (e) => {
    e.preventDefault();
    dispatch(filterByContinent(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
  };

  const handleFilterByActivity = (e) => {
    e.preventDefault();
    dispatch(filterByActivity(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
  };

  //Recharge Page

  const handleRecharge = (e) => {
    e.preventDefault();
    dispatch(getCountries());
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  const handlePrev = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage - 1);
   
  };
  const handleNext = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage + 1);
    
  };

  if (loading) {
    return (
      <div>
          <Header
            handleRecharge={handleRecharge}
            setCurrentPage={setCurrentPage}
            handleSortByCountrie={handleSortByCountrie}
            handleFilterByContinent={handleFilterByContinent}
            handleSortByPopulation={handleSortByPopulation}
            handleFilterByActivity={handleFilterByActivity}
            allActivities={allActivities}
          />
          <Loader />
      </div>
    );
  } else {
    return (
      <div>

      <div className="container-home">
        
        <Header
            handleRecharge={handleRecharge}
            setCurrentPage={setCurrentPage}
            handleSortByCountrie={handleSortByCountrie}
            handleFilterByContinent={handleFilterByContinent}
            handleSortByPopulation={handleSortByPopulation}
            handleFilterByActivity={handleFilterByActivity}
            allActivities={allActivities}
          />

        {/*Cards*/}

        <div className="buttons-paginated-prev-next">
          {/* prev */}
          {currentPage > 1 && (
            <div className="arrow-prev" onClick={(e) => handlePrev(e)} >
              <div
                className="arrow-top-prev"></div>
              <div className="arrow-bottom-prev"></div>
            </div>
          )}
          {/* text-current */}
          <h4 className="text-currentPage">{currentPage}</h4>

          {/* next */}
          {currentPage <= 24 && (
            <div className="arrow-next" onClick={(e) => handleNext(e)}>
              <div className="arrow-top-next"></div>
              <div className="arrow-bottom-next"></div>
            </div>
          )}
        </div>

        <div className="cards">
          {currentCountries.map((e) => {
            return (
              <Link id="link-card" key={e.id} to={`/countries/${e.id}`}>
                <Card
                  name={e.name}
                  image={e.image}
                  population={e.population}
                  continent={e.continent}
                />
              </Link>
            );
          })}
        </div>

        {/* Paginated*/}
        <div className="paginated">
          <Page
            countriesPerPage={countriesPerPage}
            allCountries={allCountries.length}
            page={page}
          />
        </div>
      </div>
      </div>
    );
  }
}

export default Home;
