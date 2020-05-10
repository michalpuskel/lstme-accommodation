import React, { useContext } from "react";
import UserContext from "../../../config/UserContext";
import useCampTitle from "../../../hooks/utils/useCampTitle";
import EventImage from "../../../pages/EventList/EventImage";
import useEvent from "../../../pages/EventList/useEvent";

const Footer = () => {
  const user = useContext(UserContext);
  const { event_id } = user || {};
  const campTitle = useCampTitle();

  const event = useEvent(event_id);

  return (
    <footer className="footer hero-foot">
      <div className="container">
        <div className="level content">
          <div className="level-left">
            <div className="level-item">&copy; {campTitle()}</div>
          </div>

          {event_id && event && (
            <div className="level-item">
              <a href={event.url} target="_blank" rel="noopener noreferrer">
                <EventImage image={event.image} imageFile={event.imageFile} />
              </a>
            </div>
          )}

          <div className="level-right">
            <div className="level-item">
              <a href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}`}>
                kontakt
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
