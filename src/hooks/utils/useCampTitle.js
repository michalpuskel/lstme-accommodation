import { useCallback, useContext } from "react";
import moment from "moment";
import UserContext from "../../config/UserContext";
import useEvent from "../../pages/EventList/useEvent";

const useCampTitle = () => {
  const user = useContext(UserContext);
  const { event_id } = user || {};

  const event = useEvent(event_id);

  const getCampTitle = useCallback(
    () => `${moment().format("YYYY")} ${event_id && event ? event.title : ""}`,
    [event_id, event]
  );

  return getCampTitle;
};

export default useCampTitle;
