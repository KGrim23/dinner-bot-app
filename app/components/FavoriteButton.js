"use client";
import React from "react";

export default function FavoriteButton({ onClick, isFavorited }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // Prevent the click from bubbling up to parent elements (fav icon on top of the clickable recipe card)
        onClick();
      }}
    >
      {isFavorited ? "💚" : "♡"}
    </button>
  );
}
