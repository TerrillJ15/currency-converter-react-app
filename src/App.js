import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/NavBar";
import RatesView from "./views/RatesView";

/**
 * @returns A template to render when the page is not found.
 */
const NotFound = () => {
  return <h2>404 Not Found</h2>;
};

/**
 * @returns A template to render for the app with routing.
 */
const App = () => {
  return (
    <Router basename="/">
      <Navbar />
      <main id="main" role="main" class="container pt-5 mt-5">
        <Switch>
          <Route path="/" exact component={RatesView} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
