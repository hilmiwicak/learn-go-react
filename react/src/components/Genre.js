import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default class Genre extends React.Component {
  state = {
    movies: [],
    isLoaded: false,
    error: null,
    genreName: "",
  };

  componentDidMount() {
    fetch(`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/v1/movies/` + this.props.match.params.id)
      .then((response) => {
        if (response.status !== "200") {
          let err = Error;
          err.message = "Invalid response code: " + response.status;
          this.setState({ error: err });
        }
        return response.json();
      })
      .then((json) => {
        this.setState(
          {
            movies: json.movies,
            isLoaded: true,
            genreName: this.props.location.genreName,
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            });
          }
        );
      });
  }

  render() {
    let { movies, isLoaded, error, genreName } = this.state;

    if (!movies) {
        movies = [];
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <Fragment>
          <h2>Genre: {genreName}</h2>

          <div className="list-group">
            {movies.map((m) => (
              <Link to={`/movies/${m.id}`} className="list-group-item list-group-item-action">{m.title}</Link>
            ))}
          </div>
        </Fragment>
      );
    }
  }
}
