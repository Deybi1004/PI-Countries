import axios from "axios";

//get activities 
export const getDbActivities = () => {
  return async(dispatch) => {
      let json = await axios.get('http://localhost:3001/activities');
      return dispatch({
        type: "GET_ACTIVITIES",
        payload: json.data
      })
  }
}
// get All
export const getCountries = () => {
  return async (dispatch) => {
    let json = await axios.get("http://localhost:3001/countries");

    return dispatch({
      type: "GET_COUNTRIES",
      payload: json.data,
    });
  };
};

// get ID countries
export const getCountriesId = (id) => {
  
  return async (dispatch) => {
    try {
      const json = await axios.get(`http://localhost:3001/countries/${id}`);
      //console.log(json.data)
      return dispatch({
        type: "GET_COUNTRIES_ID",
        payload: json.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

// get Country Name

export const getCountriesName = async (name) => {
  return async(dispatch) =>{
    try {
      const json = await axios.get(
        `http://localhost:3001/countries?name=${name}`
      );
  
      return dispatch({
        type: "GET_COUNTRIES_NAME",
        payload: json.data,
      });
    } catch (error) {
      console.error(error);
    }

  }
};

// Sort

export const sortByPopulation = (payload) => {
  return {
    type: "SORT_BY_POPULATION",
    payload,
  };
};

export const sortByCountries = (payload) => {
  return {
    type: "SORT_BY_COUNTRIES",
    payload,
  };
};

//Filter

export const filterByContinent = (payload) => {
  return {
    type: "FILTER_BY_CONTINENT",
    payload,
  };
};

export const filterByActivity = (payload) => {
  return {
    type: "FILTER_BY_ACTIVITY",
    payload,
  };
};

//Post

export const postActivity = (payload) => {
  return async (dispatch) => {
    try {
      const json = axios.post("http://localhost:3001/activities", payload);

      return dispatch({
        type: "POST_ACTIVITY",
        payload: json.data,
      });
    } catch (error) {
        console.error(error);
    }
  };
};

//Search Counrty
export const countryFind = (payload) => {
  return{
    type: "COUNTRY_FIND",
    payload,
  }
};

