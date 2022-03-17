<<<<<<< HEAD
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import Page404 from "./pages/Page404";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:year" render={props => <Messages {...props} />} />
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
=======
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import Page404 from "./pages/Page404";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:year" render={props => <Messages {...props} />} />
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
>>>>>>> 1157f83e3e76d98f4283c8fb2e4ab1842298a2e2
