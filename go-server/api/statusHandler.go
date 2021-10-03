package main

import (
	"encoding/json"
	"net/http"
)

func (app *application) statusHandler(writer http.ResponseWriter, request *http.Request) {
	currentStatus := AppStatus{
		Status:      "available",
		Environment: app.config.env,
		Version:     version,
	}

	json, err := json.MarshalIndent(currentStatus, "", "\t")
	if err != nil {
		app.logger.Println(err)
	}

	writer.Header().Set("Content-Type", "application/json")
	writer.WriteHeader(http.StatusOK)
	writer.Write(json)
}
