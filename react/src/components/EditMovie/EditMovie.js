import React, { Fragment } from "react";
import "./EditMovie.css";
import Input from "../form/Input";
import TextArea from "../form/TextArea";
import Select from "../form/Select";

export default class EditMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {
        id: 0,
        title: "",
        release_date: "",
        runtime: "",
        mpaa_rating: "",
        rating: "",
        description: "",
      },
      mpaaOptions: [
        { id: "G", value: "G" },
        { id: "PG", value: "PG" },
        { id: "PG13", value: "PG13" },
        { id: "R", value: "R" },
        { id: "NC17", value: "NC17" },
      ],
      isLoaded: false,
      error: null,
      validationErrors: {
          titleError: "",
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getValidation = this.getValidation.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    if (id > 0) {
      fetch(`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/v1/movie/` + id)
        .then((response) => {
          if (response.status !== "200") {
            let err = Error;
            err.message = "Invalid response code: " + response.status;
            this.setState({ error: err });
          }
          return response.json();
        })
        .then((json) => {
          const releaseDate = new Date(json.movie.release_date);

          this.setState(
            {
              movie: {
                id: id,
                title: json.movie.title,
                release_date: releaseDate.toISOString().split("T")[0],
                runtime: json.movie.runtime,
                mpaa_rating: json.movie.mpaa_rating,
                rating: json.movie.rating,
                description: json.movie.description,
              },
              isLoaded: true,
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error,
              });
            }
          );
        });
    } else {
      this.setState({ isLoaded: true });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.getValidation()) {
      console.log("MASUK");
    //   const data = new FormData(event.target);
    //   const payload = Object.fromEntries(data.entries());
    
    //   fetch(`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/v1/admin/editmovie`, {
    //       method: "POST",
    //       body: JSON.stringify(payload),
    //     }
    //   )
    //     .then((response) => response.json())
    //     .then((data) => console.log(data))
    //     .catch((err) => console.error(err));
    };
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState((prevState) => ({
      movie: {
        ...prevState.movie,
        [name]: value,
      },
    }));
  };

  getValidation = () => {
    let titleError = "";

    if (this.state.movie.title === "") {
      titleError = "Title field is required";
    };

    if (titleError) {
      this.setState({
        validationErrors: {
          titleError 
        }
      });
      return false;
    };

    return true;
  }

  render() {
    let { movie, isLoaded, error } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <Fragment>
          <h2>Add/Edit Movie</h2>
          <hr />
          <form onSubmit={this.handleSubmit}>
            <input
              type="hidden"
              name="id"
              id="id"
              value={movie.id}
              onChange={this.handleChange}
            />

            <Input
              title={"Title"}
              className={this.state.validationErrors.titleError ? "is-invalid" : ""}
              type={"text"}
              name={"title"}
              value={movie.title}
              handleChange={this.handleChange}
              errorDiv={this.state.validationErrors.titleError ? "text-danger" : "d-none"}
              errorMsg={this.state.validationErrors.titleError ?? ""}
            />

            <Input
              title={"Release Date"}
              type={"date"}
              name={"release_date"}
              value={movie.release_date}
              handleChange={this.handleChange}
            />

            <Input
              title={"Runtime"}
              type={"text"}
              name={"runtime"}
              value={movie.runtime}
              handleChange={this.handleChange}
            />

            <Select
              title={"MPAA Rating"}
              name={"mpaa_rating"}
              options={this.state.mpaaOptions}
              value={movie.mpaa_rating}
              handleChange={this.handleChange}
              placeholder={"Choose..."}
            />

            <Input
              title={"Rating"}
              type={"text"}
              name={"rating"}
              value={movie.rating}
              handleChange={this.handleChange}
            />

            <TextArea
              title={"Description"}
              name={"description"}
              value={movie.description}
              rows={"3"}
              handleChange={this.handleChange}
            />

            <hr />

            <button className="btn btn-primary">Save</button>
          </form>

          <div className="mt-3">
            <pre>{JSON.stringify(this.state, null, 3)}</pre>
          </div>
        </Fragment>
      );
    }
  }
}
