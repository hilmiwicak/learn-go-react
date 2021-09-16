package main

import (
    "flag";
    "fmt"
)

const version = "1.0.0"

type config struct {
    port int
    env string
}

func main(){
    var cfg config

    flag.IntVar(&cfg.port, "port", 4000, "Server port to listen on")
    flag.StringVar(&cfg.env, "env", "dev", "Application Environment (dev|prod)")
    flag.Parse()

    fmt.Println("Running .... ")
}
