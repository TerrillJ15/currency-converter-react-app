import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/NavBar";
import RatesView from "./views/RatesView";

const NotFound = () => {
  return <h2>404 Not Found</h2>;
};

const App = () => {
  return (
    <Router basename="/">
      <Navbar />
      <Switch>
        <Route path="/" exact component={RatesView} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
