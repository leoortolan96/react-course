import { useContext, useEffect, useState } from "react";
import MeetupsList from "../components/meetups/MeetupList";
import FavoritesContext from "../store/favorites-context";

// const DUMMY_DATA = [
//   {
//     id: "m1",
//     title: "This is a first meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "Meetupstreet 5, 12345 Meetup City",
//     description:
//       "This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!",
//   },
//   {
//     id: "m2",
//     title: "This is a second meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "Meetupstreet 5, 12345 Meetup City",
//     description:
//       "This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!",
//   },
// ];

function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);
  const favoritesCtx = useContext(FavoritesContext);

  function setFavoriteMeetupsFromStorage(meetups) {
    const favoritesFromStorage = localStorage.getItem("favorite_meetup_ids");
    const favoriteMeetupIds =
      favoritesFromStorage !== null ? JSON.parse(favoritesFromStorage) : [];
     let favorites = [];
    meetups.forEach((meetup) => {
      if (favoriteMeetupIds.some((meetupId) => meetupId === meetup.id)) {
        favorites = favorites.concat(meetup);
      }
    });
    favoritesCtx.setFavorites(favorites);
  }

  useEffect(() => {
    setIsLoading(true);
    fetch("https://react-course-43389-default-rtdb.firebaseio.com/meetups.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const meetups = [];
        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key],
          };
          meetups.push(meetup);
        }
        // console.log(meetups);
        setFavoriteMeetupsFromStorage(meetups);
        setLoadedMeetups(meetups);
        setIsLoading(false);
      });
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>All meetups page</h1>
      <MeetupsList meetups={loadedMeetups} />
    </section>
  );
}
export default AllMeetupsPage;
