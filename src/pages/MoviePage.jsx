import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MoviePage() {
  const { id } = useParams(); // IMDb ID
  const [movie, setMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "96ed6c38"; // ✅ Your OMDb key
        const movieRes = await axios.get("https://www.omdbapi.com/", {
          params: {
            apikey: apiKey,
            i: id,
            plot: "full",
          },
        });
        setMovie(movieRes.data);
      } catch (err) {
        console.error("Error fetching movie:", err);
      }
    };

    fetchData();
  }, [id]);

  if (!movie) return <p className="text-center mt-4">Loading...</p>;

  const trailerSearch = `${movie.Title} trailer`;

  return (
    <div className="container" style={{ marginTop: "80px" }}>
      <h2 className="mb-3">{movie.Title}</h2>

      <img
        src={movie.Poster}
        alt={movie.Title}
        className="img-fluid mb-3"
        style={{ maxWidth: "300px" }}
        onError={(e) => (e.target.src = "https://via.placeholder.com/300")}
      />

      <p>{movie.Plot}</p>
      <p><strong>Released:</strong> {movie.Released}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Actors:</strong> {movie.Actors}</p>
      <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>

      <div className="mb-4">
        <button onClick={() => setShowModal(true)} className="btn btn-danger me-2">
          ▶️ Play Trailer
        </button>

        <a
          href={`https://1337x.to/search/${encodeURIComponent(movie.Title)}/1/`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-success"
        >
          🎬 Download (1337x)
        </a>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Watch Trailer</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="ratio ratio-16x9">
                  <iframe
                    title="Trailer"
                    src={`https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(trailerSearch)}`}
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
