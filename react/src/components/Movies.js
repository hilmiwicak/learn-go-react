import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default class Movies extends React.Component {
  state = {
    movies: [],
  };

  componentDidMount() {
    this.setState({
      movies: [
        { id: 1, title: "It's Kind of A Funny Story", runtime: 142 },
        { id: 2, title: "Batman Rises (1)", runtime: 159 },
        { id: 3, title: "Batman Rises (2)", runtime: 188 },
      ],
    });
  }

  render() {
    return (
      <Fragment>
        <h2>Choose a movie</h2>

        <ul>
          {this.state.movies.map((movie) => (
            <li key="movie.id">
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
}
