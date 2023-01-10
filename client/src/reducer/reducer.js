const initialState = {
  countries: [],
  countriesCopy: [],
  countryId: [],
  activities: [],
  formCountries:[]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // get activities
    case "GET_ACTIVITIES":
      //console.log(action.payload);
      return{
        ...state,
        activities:action.payload
      }
    // get All
    case "GET_COUNTRIES":
      //console.log(action.payload[0])
      try {
        return {
          ...state,
          countries: action.payload,
          countriesCopy: action.payload,
          formCountries: action.payload
        }
        ;
      } catch (error) {
        console.error(error);
      }
      break;

    // get Name
    case "GET_COUNTRIES_NAME":
      return {
        ...state,
        countries: action.payload,
      };
      

    //get ID
    case "GET_COUNTRIES_ID":
      return {
        ...state,
        countryId: action.payload,
      };

    // post Activity
    case "POST_ACTIVITY":
      return {
        ...state,
      };

    // filter
    case "SORT_BY_POPULATION":
      
      let sortPopulation = state.countriesCopy;
      if (action.payload !== "-") {
        sortPopulation =
          action.payload === "Higher"
            ? state.countries.sort((a, b) => {
                if (a.population > b.population) {
                  return -1;
                }
                if (b.population > a.population) {
                  return 1;
                }
                return 0;
              })
            : state.countries.sort((a, b) => {
                if (a.population > b.population) {
                  return 1;
                }
                if (b.population > a.population) {
                  return -1;
                }
                return 0;
              }); 
      }
      return {
       ...state,
        countries: sortPopulation,
      };
      

    case "SORT_BY_COUNTRIES":
      //console.log(state.countries)
      let sortCountries = state.countriesCopy;

      if(action.payload !== '-') {
        sortCountries = action.payload === 'A-Z' 
        ? state.countries.sort((a,b) => {
            if(a.name > b.name) {
                return 1
             } 
             if(b.name > a.name) {
                return -1
             }
             return 0 
        }) 
        : state.countries.sort((a,b) => {
            if(a.name > b.name) {
                return -1
             } 
             if(b.name > a.name) {
                return 1
             }
             return 0
        })
      }
      return {
        ...state,
        countries: sortCountries
      }

// Filter 

    case "FILTER_BY_CONTINENT":
      
      const allCountries = state.countriesCopy
      const filterByContinent = action.payload === 'All'
      ? allCountries 
      : allCountries.filter(country => country.continent.includes(action.payload))

      return {
       ...state,
        countries: filterByContinent
      };

// Filter by ACtivity
      
    case "FILTER_BY_ACTIVITY": 
      const allActivities = state.formCountries
      const filterByActivity = action.payload ===  'All'
      ?allActivities.filter(c => c.activities.length > 0)
      :allActivities.filter(c => c.activities?.some(a => a.name === action.payload));
      //console.log(allActivities)
      //console.log(filterByActivity);
        
      return {
            ...state,
             countries: filterByActivity 
          }
      case "COUNTRY_FIND":
        const countries= state.formCountries
        const allCountry= countries.filter(c =>{
          return c.name.toLowerCase().includes(action.payload.toLowerCase())
        })

        return{
          ...state,
          countries:allCountry,
        }

      default:
        return state
  }


};

export default reducer;
