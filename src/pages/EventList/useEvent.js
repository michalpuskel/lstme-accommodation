import { useState, useEffect } from "react";

import { database } from "../../config/firebase";

const useEvent = (eventId) => {
  const [event, setEvent] = useState({
    uid: "",
    title: "",
    description: "",
    url: "",
    image: "",
    imageFile: null,
  });

  useEffect(() => {
    if (!eventId) {
      setEvent(null);
    } else {
      const ref = database.collection("events").doc(eventId);
      const unsubscribe = ref.onSnapshot(
        (snapshot) => {
          setEvent(snapshot.data());
        },
        (error) => console.error(error)
      );

      return () => {
        unsubscribe();
        // setUser(undefined);
      };
    }
  }, [eventId]);

  return event;
};

export default useEvent;
