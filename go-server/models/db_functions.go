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
func (m *DBModel) Movie(id int) (*Movie, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	// the $1 is a placeholder
	query := `	SELECT 
					id, title, description, year, release_date, rating, runtime, mpaa_rating, created_at, updated_at 
				FROM 
					movies
				WHERE
					id = $1
	`

	row := m.DB.QueryRowContext(ctx, query, id)

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

	query = `	SELECT
					mg.id, mg.movie_id, mg.genre_id, g.genre_name
				FROM
					movies_genres AS mg
				LEFT JOIN
					genres AS g
				ON
					 g.id = mg.genre_id
				WHERE
					mg.movie_id = $1
	`

	rows, _ := m.DB.QueryContext(ctx, query, id)
	defer rows.Close()

	genres := make(map[int]string)
	for rows.Next() {
		var mg MovieGenre
		err := rows.Scan(
			&mg.ID,
			&mg.MovieID,
			&mg.GenreID,
			&mg.Genre.GenreName,
		)
		if err != nil {
			return nil, err
		}

		genres[mg.ID] = mg.Genre.GenreName
	}

	movie.MovieGenre = genres

	return &movie, nil
}

/*
 * returns all movies and error if any
 */
func (m *DBModel) AllMovies(id int) ([]*Movie, error) {
	return nil, nil
}
