package main

import (
	"errors"
	"go-server-movie-backend/models"
	"net/http"
	"strconv"
	"time"

	"github.com/julienschmidt/httprouter"
)

func (app *application) getOneMovie(writer http.ResponseWriter, request *http.Request) {
	params := httprouter.ParamsFromContext(request.Context())

	id, err := strconv.Atoi(params.ByName("id"))
	if err != nil {
		app.logger.Print(errors.New("invalid id parameter"))
	}

	app.logger.Println("id is", id)

	movie := models.Movie{
		ID:          id,
		Title:       "Shang Chi",
		Description: "halo",
		Year:        2021,
		ReleaseDate: time.Date(2021, 8, 28, 0, 0, 0, 0, time.Local),
		Runtime:     100,
		Rating:      5,
		MPAARating:  "PG-13",
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	err = app.writeJSON(writer, http.StatusOK, movie, "movie")
}

func (app *application) getAllMovies(writer http.ResponseWriter, request *http.Request) {

}
