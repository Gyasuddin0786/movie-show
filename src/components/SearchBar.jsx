import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex mb-4" style={{marginTop: "80px"}}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search for movies..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="btn btn-primary">Search</button>
    </form>
  );
}
