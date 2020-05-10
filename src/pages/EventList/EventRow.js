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

  const handleDelete = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const ref = database.collection("events").doc(uid);
    try {
      await ref.delete();
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
        <div className="pr-8 w-full">
          <h3 className="title">
            <div className="flex justify-between">
              {title}
              {user.is_super_admin && (
                <button
                  className="button is-danger is-outlined is-small"
                  onClick={handleDelete}
                >
                  <span className="icon" title="Nenávratne vymazať organizáciu">
                    <i className="fas fa-times" />
                  </span>
                </button>
              )}
            </div>
          </h3>
          {description && <p>{description}</p>}
        </div>
        {imageFile ? (
          <EventImage image={image} imageFile={imageFile} />
        ) : (
          <div className="event-image-placeholder" />
        )}
      </div>
    </div>
  );
};

export default EventRow;
