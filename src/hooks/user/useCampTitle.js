import { useCallback } from "react";
import moment from "moment";

const useCampTitle = () => {
  const getCampTitle = useCallback(
    () => `${moment().format("YYYY")} LSTME`,
    []
  );

  return getCampTitle;
};

export default useCampTitle;
