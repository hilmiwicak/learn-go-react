import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/Admin";
import Movies from "./components/Movies";
import Movie from "./components/Movie";
import Categories from "./components/Categories";

function Category() {
  let { path } = useRouteMatch();

  return (
    <div>
      <h2>Categories</h2>

      <ul>
        <li>
          <Link to={`${path}/drama`}>Drama</Link>
        </li>
        <li>
          <Link to={`${path}/comedy`}>Comedy</Link>
        </li>
      </ul>
    </div>
  );
}

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
                  <Link to="/category">Categories</Link>
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
              <Route exact path="/category">
                <Category />
              </Route>
              <Route
                exact
                path="/category/drama"
                render={(props) => <Categories {...props} title={`Drama`} />}
              ></Route>
              <Route
                exact
                path="/category/comedy"
                render={(props) => <Categories {...props} title={`Comedy`} />}
              ></Route>
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