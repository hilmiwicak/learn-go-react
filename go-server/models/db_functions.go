package models

import (
	"context"
	"database/sql"
	"time"
)

type DBModel struct {
	DB *sql.DB
}

/*
 * returns one movie and error, if any
 */
func (model *DBModel) Movie(id int) (*Movie, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	// the $1 is a placeholder
	query := `select id, title, description, year, release_date, rating, runtime, mpaa_rating, created_at, updated_at from movies where id = $1`

	row := model.DB.QueryRowContext(ctx, query, id)

	var movie Movie

	err := row.Scan(
		&movie.ID,
		&movie.Title,
		&movie.Description,
		&movie.Year,
		&movie.ReleaseDate,
		&movie.Rating,
		&movie.Runtime,
		&movie.MPAARating,
		&movie.CreatedAt,
		&movie.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}

	// the challenge is here but i don't know shit about these lmao

	return &movie, nil
}

/*
 * returns all movies and error if any
 */
func (model *DBModel) AllMovies(id int) ([]*Movie, error) {
	return nil, nil
}
