import React from "react";
import MovieCard from "./MovieCard";

export default function MovieList({ movies }) {
  if (!movies.length) return <p className="text-center mt-4">No movies found.</p>;

  return (
    <div className="row">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}
