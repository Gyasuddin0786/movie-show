import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("hindi"); // default search term

  const apiKey = "96ed6c38"; // ✅ OMDb API Key

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://www.omdbapi.com/", {
        params: {
          apikey: apiKey,
          s: query,
          page,
        },
      });

      if (res.data.Search) {
        // If page === 1, replace movies; else append
        setMovies((prev) => (page === 1 ? res.data.Search : [...prev, ...res.data.Search]));
        setHasMore(res.data.Search.length > 0);
      } else {
        if (page === 1) setMovies([]);
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error loading movies:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1); // reset to first page
    setMovies([]); // clear old movies
    setHasMore(true);
  };

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.offsetHeight &&
      !loading &&
      hasMore
    ) {
      setPage((prev) => prev + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="container mt-4">
      <SearchBar onSearch={handleSearch} />
      <MovieList movies={movies} />
      {loading && <p className="text-center mt-3">Loading more movies...</p>}
    </div>
  );
}
