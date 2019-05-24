import { useCallback } from "react";
import moment from "moment";

const useElapsedTime = () => {
  const elapsedTime = useCallback(
    timestamp => moment(timestamp.toDate()).fromNow(),
    []
  );

  return elapsedTime;
};

export default useElapsedTime;
