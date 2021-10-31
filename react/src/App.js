import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/Admin";
import Movies from "./components/Movies";
import Movie from "./components/Movie";
import Genres from "./components/Genres"

export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <div className="row">
          <h1 className="mt-3">Go-React Watch Movies</h1>
          <hr />
          <hr className="mb-3"></hr>
        </div>

        <div className="row">
          <div className="col-md-2">
            <nav>
              <ul className="list-group">
                <li className="list-group-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/movies">Movies</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/genres">Genres</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/admin">Admin</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="col-md-10">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/movies/:id" component={Movie}></Route>
              <Route exact path="/genres">
                <Genres />
              </Route>
              <Route path="/admin">
                <Admin />
              </Route>
              <Route path="/movies">
                <Movies />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}