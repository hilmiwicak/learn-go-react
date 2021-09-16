import React, { Fragment } from "react";

export default class Movie extends React.Component {
  state = {
    movie: {},
  };

  componentDidMount() {
    this.setState({
      movie: {
        id: this.props.match.params.id,
        title: "Batman Rises (2)",
        runtime: 188,
      },
    });
  }

  render() {
    return (
      <Fragment>
        <h2>Movie: {this.state.movie.title}</h2>

        <table className="table table-compact table-striped">
          <thead></thead>
          <tbody>
            <tr>
              <td>
                <strong>title: </strong>
              </td>
              <td>{this.state.movie.title}</td>
            </tr>

            <tr>
              <td>
                <strong>Runtime: </strong>
              </td>
              <td>{this.state.movie.title} minutes</td>
            </tr>
          </tbody>
        </table>
      </Fragment>
    );
  }
}
