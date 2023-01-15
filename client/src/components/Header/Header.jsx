import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';

function Header(
    {handleRecharge,setCurrentPage,handleSortByCountrie,handleFilterByContinent,handleSortByPopulation,handleFilterByActivity,allActivities}
    ) {
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

        </div>
    </div>
  )
}

export default Header