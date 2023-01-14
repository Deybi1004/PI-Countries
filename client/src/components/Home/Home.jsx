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
    console.log("click prev");
  };
  const handleNext = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage + 1);
    console.log("click next");
  };

  if (loading) {
    return (
      <div>
        <div className="container-home">
          {/* Buttons */}
          <div className="container-head">
            <div className="container-button-home">
              <div>
                <Link className="button-create" to="/form">
                  <button className="createButton">Create Activity</button>
                </Link>
              </div>
              <div>
                <button
                  className="rechargeButton"
                  onClick={(e) => handleRecharge(e)}
                >
                  Recharge
                </button>
              </div>
            </div>
            {/*SearchBar*/}
            <div className="container-searchBar">
              <SearchBar setCurrentPage={setCurrentPage} />
            </div>
          </div>

          {/* Filters */}
          <div className="container-filters">
            <div className="filters">
              {/* Filter A-Z */}
              <label>Sorter (A-Z)</label>
              <select
                className="select-country"
                onChange={(e) => handleSortByCountrie(e)}
              >
                <option value="-">-</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
              </select>
              {/* Filters By Continent */}
              <label>Filter (Continent)</label>
              <select
                className="select-continent"
                onChange={(e) => handleFilterByContinent(e)}
              >
                <option>All</option>
                <option>Africa</option>
                <option>Antarctica</option>
                <option>Asia</option>
                <option>Europe</option>
                <option>North America</option>
                <option>Oceania</option>
                <option>South America</option>
              </select>
              {/* Filters by Population*/}
              <label>Sorter (Population)</label>
              <select
                className="sort-population"
                onChange={(e) => handleSortByPopulation(e)}
              >
                <option>-</option>
                <option>Higher</option>
                <option>Lower</option>
              </select>
              {/* Filter by Activity */}
              <label>Filter (Activity)</label>
              <select
                className="select-activity"
                onChange={(e) => handleFilterByActivity(e)}
              >
                <option>All</option>
                {allActivities.map((e) => {
                  return <option key={e.id}>{e.name}</option>;
                })}
              </select>
            </div>
          </div>

          <Loader />
        </div>
      </div>
    );
  } else {
    return (
      <div className="container-home">
        {/* Buttons */}
        <div className="container-head">
          <div className="container-button-home">
            <div>
              <Link className="button-create" to="/form">
                <button className="createButton">Create Activity</button>
              </Link>
            </div>
            <div>
              <button
                className="rechargeButton"
                onClick={(e) => handleRecharge(e)}
              >
                Recharge
              </button>
            </div>
          </div>
          {/*SearchBar*/}
          <div className="container-searchBar">
            <SearchBar setCurrentPage={setCurrentPage} />
          </div>
        </div>

        {/* Filters */}
        <div className="container-filters">
          <div className="filters">
            {/* Filter A-Z */}
            <label>Sorter (A-Z)</label>
            <select
              className="select-country"
              onChange={(e) => handleSortByCountrie(e)}
            >
              <option value="-">-</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
            </select>
            {/* Filters By Continent */}
            <label>Filter (Continent)</label>
            <select
              className="select-continent"
              onChange={(e) => handleFilterByContinent(e)}
            >
              <option>All</option>
              <option>Africa</option>
              <option>Antarctica</option>
              <option>Asia</option>
              <option>Europe</option>
              <option>North America</option>
              <option>Oceania</option>
              <option>South America</option>
            </select>
            {/* Filters by Population*/}
            <label>Sorter (Population)</label>
            <select
              className="sort-population"
              onChange={(e) => handleSortByPopulation(e)}
            >
              <option>-</option>
              <option>Higher</option>
              <option>Lower</option>
            </select>
            {/* Filter by Activity */}
            <label>Filter (Activity)</label>
            <select
              className="select-activity"
              onChange={(e) => handleFilterByActivity(e)}
            >
              <option>All</option>
              {allActivities.map((e) => {
                return <option key={e.id}>{e.name}</option>;
              })}
            </select>
          </div>
        </div>

        {/*Cards*/}

        {/* <div className="buttons-paginated-prev-next">
          {currentPage > 1 &&
            <div className="button-prev" onClick={(e) => handlePrev(e)} >prev</div>
          
          } 
            
            <h4 className="text-currentPage">{currentPage}</h4>
            <div  className="button-next" onClick={(e) => handleNext(e)}>next</div> */}

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
    );
  }
}

export default Home;
