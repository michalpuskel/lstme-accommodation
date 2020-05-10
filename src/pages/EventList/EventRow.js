import React, { useContext } from "react";
import { database } from "../../config/firebase";
import UserContext from "../../config/UserContext";
import "./EventList.scss";
import EventImage from "./EventImage";

const EventRow = ({ title, description, image, imageFile, uid }) => {
  const user = useContext(UserContext);

  const handleSelect = async (event) => {
    event.preventDefault();

    const ref = database.collection("users").doc(user.uid);
    try {
      await ref.update({
        event_id: uid,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`box event-list__row ${
        user.event_id === uid ? "event-list__row--selected" : ""
      }`}
      onClick={handleSelect}
    >
      <div className="flex justify-between">
        <div className="pr-8">
          <h3 className="title">{title}</h3>
          {description && <p>{description}</p>}
        </div>
        <EventImage image={image} imageFile={imageFile} />
      </div>
    </div>
  );
};

export default EventRow;
