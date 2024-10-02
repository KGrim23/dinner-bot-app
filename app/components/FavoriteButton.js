"use client";
import React from "react";

export default function FavoriteButton({
  onClick,
  isFavorited,
  toggleFavorite,
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // Prevent click from bubbling up to the parent
        onClick();
      }}
      className={`text-xl ${
        isFavorited ? "text-green-700" : "text-gray-500"
      } focus:outline-none`}
      aria-label="Toggle Favorite"
    >
      {isFavorited ? "💚" : "♡"}
    </button>
  );
}
