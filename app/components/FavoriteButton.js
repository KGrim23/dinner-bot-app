"use client";
import React from "react";

export default function FavoriteButton({ onClick, isFavorited }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // Prevent the click from bubbling up to parent elements
        onClick();
      }}
    >
      {isFavorited ? "💚" : "♡"} {/* Display based on favorited status */}
    </button>
  );
}
