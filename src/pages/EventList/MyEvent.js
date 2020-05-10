import React, { useContext } from "react";
import { database } from "../../config/firebase";
import UserContext from "../../config/UserContext";
import EventRow from "./EventRow";
import useEvent from "./useEvent";

const MyEvent = () => {
  const user = useContext(UserContext);
  const { event_id } = user || {};

  const event = useEvent(event_id);

  const handleLeaveEvent = async (event) => {
    event.preventDefault();

    const ref = database.collection("users").doc(user.uid);
    try {
      await ref.update({
        event_id: null,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {event_id && event ? (
        <>
          <h4 className="title mt-32">Ste prihlásený do organizácie:</h4>
          <EventRow {...event} />
          <div className="flex justify-center">
            <button className="button is-light" onClick={handleLeaveEvent}>
              Odhlásiť sa z organizácie
            </button>
          </div>
        </>
      ) : (
        <div className="box mt-16">
          <p>Nie ste prihlásený do žiadnej organizácie.</p>
        </div>
      )}
    </div>
  );
};

export default MyEvent;
