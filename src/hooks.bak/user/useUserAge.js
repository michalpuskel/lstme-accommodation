import { useCallback } from "react";
import moment from "moment";

const useUserAge = () => {
  const getUserAge = useCallback(
    user => moment(user.birth_date).fromNow(true),
    []
  );

  return getUserAge;
};

export default useUserAge;
