import { faV } from "@fortawesome/free-solid-svg-icons";
import React, {createContext, useState } from "react";

const favContext = createContext();

const FavProvider = ({ children }) => {
  const [favorite, setFavorite] = useState([]);

  const addFavorite = (movie) => {
    setFavorite([favorite, movie]);
  };
  const removeFavorite = (movieId) => {
    setFavorite(favorite.filter((movie) => movie.id !== movieId));
  };

  return (
    <favContext.Provider value={{ favorite, addFavorite, removeFavorite }}>
      {children}
    </favContext.Provider>
  );
};

export {favContext,FavProvider};

