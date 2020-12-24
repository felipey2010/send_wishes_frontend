import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Page404 from "./pages/Page404";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="*" component={Page404} />
        </Switch>
      </div>
    </Router>
  );
}

/*
  Idea
  Make a simple web app where people can leave their best wishes
*/
