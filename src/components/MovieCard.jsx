import React from "react";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  const poster = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x400";

  const handleCardClick = () => {
    navigate(`/movie/${movie.imdbID}`);
  };

  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
      <div
        className="card h-100 shadow-sm"
        onClick={handleCardClick}
        style={{ cursor: "pointer" }}
      >
        <img
          src={poster}
          className="card-img-top"
          alt={movie.Title}
          style={{ height: "300px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
          <h6 className="card-title">{movie.Title}</h6>
          <div className="mt-auto d-flex justify-content-between">
            <span className="text-muted small">Click to view</span>
            <a
              href={`https://yts.mx/browse-movies/${movie.Title.replace(/\s/g, "-")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-success"
              onClick={(e) => e.stopPropagation()}
            >
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
