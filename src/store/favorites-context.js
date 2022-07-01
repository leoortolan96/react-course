import { createContext, useState } from "react";

const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorite: (favoriteMeetup, saveToLocalStorage) => {},
  removeFavorite: (meetupId) => {},
  itemIsFavorite: (meetupId) => {},
});

export function FavoritesContextProvider(props) {
  const [userFavorites, setUserFavorites] = useState([]);

  function addFavoriteHandler(favoriteMeetup, saveToLocalStorage) {
    setUserFavorites((prevUserFavorites) => {
      const result = prevUserFavorites.concat(favoriteMeetup);
      if (saveToLocalStorage) {
        localStorage.setItem(
          "favorite_meetup_ids",
          JSON.stringify(result.map((meetup) => meetup.id))
        );
      }
      // console.log(JSON.stringify(result.map((meetup) => meetup.id)));
      return result;
    });
  }

  function removeFavoriteHandler(meetupId) {
    setUserFavorites((prevUserFavorites) => {
      const result = prevUserFavorites.filter(
        (meetup) => meetupId !== meetup.id
      );
      localStorage.setItem(
        "favorite_meetup_ids",
        JSON.stringify(result.map((meetup) => meetup.id))
      );
      // console.log(JSON.stringify(result.map((meetup) => meetup.id)));
      return result;
    });
  }

  function itemIsFavoriteHandler(meetupId) {
    return userFavorites.some((meetup) => meetupId === meetup.id);
  }

  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler,
  };

  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;
