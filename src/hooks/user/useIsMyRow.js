import { useContext, useCallback } from "react";

import UserContext from "../../config/UserContext";

const useIsMyRow = userId => {
  const authedUser = useContext(UserContext);

  const isMyRow = useCallback(() => userId === authedUser.uid, [
    userId,
    authedUser.uid
  ]);

  return { isMyRow, authedUser };
};

export default useIsMyRow;
