import { useCallback, useContext } from "react";
import moment from "moment";
import UserContext from "../../config/UserContext";

const useCampTitle = () => {
  const user = useContext(UserContext);
  const { event_id } = user || {};

  const getCampTitle = useCallback(
    () => `${moment().format("YYYY")} ${event_id ? "LSTME" : ""}`,
    [event_id]
  );

  return getCampTitle;
};

export default useCampTitle;
