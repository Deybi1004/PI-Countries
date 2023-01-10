import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Description from "./components/Description/Description";
import Form from "./components/Form/Form";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/countries' component={Home} />
          <Route exact path='/countries/:id' component={Description}/>
          <Route exact path='/form' component={Form} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
