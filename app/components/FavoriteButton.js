"use client";
import React, { useState } from "react";

export default function FavoriteButton() {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`text-xl ${
        isFavorited ? "text-red-700" : "text-gray-500"
      } focus:outline-none`}
      aria-label="Toggle Favorite"
    >
      {isFavorited ? "♥" : "♡"}
    </button>
  );
}
