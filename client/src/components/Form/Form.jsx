import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postActivity } from "../../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import Send from "../Send/Send";
import Nav from "../Nav/Nav";
import "./Form.css";

const validate = (input) => {
  let errorValidate = {};
  //console.log(input);
  let hasSpecialChar = /[^a-zA-Z\sáéíóúÁÉÍÓÚñÑ]/.test(input.name);
  if (hasSpecialChar) errorValidate.name = "Name must not have special characters";
  if (!input.name) errorValidate.name = "Name must be completed";
  if(input.name.length < 4) errorValidate.name = "Name must have more than 3 characters";
  if (!input.difficulty) errorValidate.difficulty = "Difficulty must be completed";
  if (input.difficulty > 5 ||input.difficulty < 1 ) errorValidate.difficulty = "Difficulty must not be less than 1 and greater than 5";
  if (!input.duration) errorValidate.duration = "Duration must be completed";
  if (!input.season) errorValidate.season = "Season must be selected";
  if (input.countries.length < 1) errorValidate.countries = "Countries must be completed";
  return errorValidate;
};

function Form() {
  
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.formCountries);
  const sortCountries = countries.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (b.name > a.name) {
      return -1;
    }
    return 0;
  });
  //console.log(sortCountries);

  


  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  const handleCountrySelect = (e) => {
    //Valido si está seleccionado un país
    if (e.target.value === "-") {
      alert("Seleccione un país");
      setErrors(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
      
    } else {
      //Convierto el value a JSON

      let infoConvert = JSON.parse(e.target.value);

      //Hago una búsqueda del infoConver.name en los countries ya agregados
      const found = input.countries.find((e) => e.name === infoConvert.name);
      //Si ya existe un nombre así devuelve el console.log y si no hay hace el setInput
      if (found) {
        alert(`${infoConvert.name} ya está agregado`);
      } else {
        setInput({
          ...input,
          countries: [...input.countries, infoConvert],
        });
        setErrors(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
      }
    }
  };

  //Validar los cambios al escribir y/o seleccionar
  const handleChange = (e) => {
    //console.log(e.target.value);
    if (e.target.value === "-") {
      alert("Seleccione una estación del año");
      setInput({
        ...input,
        [e.target.name] : "",
      });
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
      setErrors(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    }
  };

  //Elimina los países
  const handleCountryDelete = (e) => {
    e.preventDefault();
    //console.log(e.target.value)
    setInput({
      ...input,
      countries: input.countries.filter((c) => c.id !== e.target.value),
    });
  };

  //Envía el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(input);
    //manda el input al validated y si no coinocide con lo pedido , crea un error
    const errorsFields = validate(input);

    // si hay un error la funcion Object.keys analiza si hay unu error o no para seguir con el código
    if (!Object.keys(errorsFields).length) {
      console.log("enviado");
      dispatch(postActivity(input));
      setInput({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: [],
      });
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3500);
      setTimeout(() => {
        history.push("/countries");
      }, 3500);
    } else {
      alert("Please complete all the camps needed or correct the errors");
    }
  };
  if (loading) {
    return <Send />;
  } else {
    return (
      <div className="container-all">
        
        <div className="Form-container">
        <div className="link-to-home">
          <Link id="text-link"to="/countries">
            <Nav></Nav>
          </Link>
        </div>
          <div className="container-title">
          <h1 className="Title-Form">Create Activity</h1>
          </div>
          <div className="form-complete">
          <form className="Form" onSubmit={(e) => handleSubmit(e)}>
            <div className="container-activity">
              <label className="label-form">Name of Activity </label>
              <input
                className="input-activity"
                type="text"
                autoComplete="off"
                name="name"
                value={input.name}
                onChange={(e) => handleChange(e)}
              />
              {errors.name && <p>{errors.name}</p>}
            </div>

            <div className="container-difficulty">
              <label className="label-form">Difficulty (1-5) </label>
              <input
                className="input-difficulty"
                type="number"
                min={1}
                max={5}
                value={input.difficulty}
                name="difficulty"
                onChange={(e) => handleChange(e)}
              />
              {errors.difficulty && <p>{errors.difficulty}</p>}
            </div>

            <div className="container-duration">
              <label className="label-duration">Duration (Hr.) </label>
              <input
                className="input-duration"
                type="time"
                value={input.duration}
                name="duration"
                onChange={(e) => handleChange(e)}
              />
              {errors.duration && <p>{errors.duration}</p>}
            </div>

            <div className="container-season">
              <label className="label-season">Season </label>
              <select
                className="select-season"
                name="season"
                onChange={(e) => handleChange(e)}
              >
                <optgroup label="Seasons">
                  <option value="-">-</option>
                  <option value="Spring">Spring</option>
                  <option value="Summer">Summer</option>
                  <option value="Autumn">Autumn</option>
                  <option value="Winter">Winter</option>
                </optgroup>
              </select>
              {errors.season && <p>{errors.season}</p>}
            </div>

            <div className="container-country">
              <label className="label-country">Country</label>
              <select
                className="select-country"
                onChange={(e) => handleCountrySelect(e)}
              >
                <option value={"-"}>-</option>
                {sortCountries.map((e) => {
                  return (
                    <option
                      key={e.id}
                      value={JSON.stringify({
                        name: e.name,
                        id: e.id,
                        image: e.image,
                      })}
                    >
                      {e.name}
                    </option>
                  );
                })}
              </select>
             
            </div>

            </form>
          </div>

            <div className="submit-formm">
              <button className="button-submit" type="submit" onClick={e => handleSubmit(e)}>
                Create
              </button>
            </div>
          
        </div>
        <div className="container-card-country">
                {input.countries.map((c) => {
                  return (
                    <div className="card-country-form"key={c.id} value={c.id}>
                      <p className="name-country">{c.name}</p>
                      <img className="image-country" src={c.image} />
                      <button
                        className="button-delete-country"
                        key={c.id}
                        value={c.id}
                        onClick={(e) => handleCountryDelete(e)}
                      >
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
      </div>
    );
  }
}

export default Form;
