import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@favorites");
        if (jsonValue != null) {
          setFavorites(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error("Failed to load favorites:", e);
      }
    };
    loadFavorites();
  }, []);

  const saveFavorites = async (newFavorites) => {
    try {
      await AsyncStorage.setItem("@favorites", JSON.stringify(newFavorites));
    } catch (e) {
      console.error("Failed to save favorites:", e);
    }
  };

  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.id === movie.id);
      const updated = exists
        ? prev.filter((fav) => fav.id !== movie.id)
        : [...prev, movie];

      saveFavorites(updated);
      return updated;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
