import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/NavBar";
import RatesView from "./views/RatesView";

const NotFound = () => {
  return <h2>404 Not Found</h2>;
};

const App = () => {
  return (
    <Router basename="/">
      <Navbar />
      <div className="main-content">
        <Switch>
          <Route path="/" exact component={RatesView} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
