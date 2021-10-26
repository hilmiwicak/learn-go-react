package main

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/julienschmidt/httprouter"
)

func (app *application) getOneMovie(writer http.ResponseWriter, request *http.Request) {
	params := httprouter.ParamsFromContext(request.Context())

	id, err := strconv.Atoi(params.ByName("id"))
	if err != nil {
		app.logger.Print(errors.New("invalid id parameter"))
		app.errorJSON(writer, err)
		return
	}

	app.logger.Println("id is", id)

	movie, err := app.models.DB.Movie(id)

	err = app.writeJSON(writer, http.StatusOK, movie, "movie")
}

func (app *application) getAllMovies(writer http.ResponseWriter, request *http.Request) {

}
