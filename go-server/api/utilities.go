package main

import (
	"encoding/json"
	"net/http"
)

func (app *application) writeJSON(writer http.ResponseWriter, status int, data interface{}, wrap string) error {
	wrapper := make(map[string]interface{})

	wrapper[wrap] = data

	json, err := json.MarshalIndent(wrapper, "", "\t")
	if err != nil {
		return err
	}

	writer.Header().Set("Content-Type", "application/json")
	writer.WriteHeader(status)
	writer.Write(json)
	return nil
}
