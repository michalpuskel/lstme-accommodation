import { useCallback } from "react";

import useEmptyBedCount from "./useEmptyBedCount";

const useFreeBedExists = (bedCount, bedListLength) => {
  const emptyBedCount = useEmptyBedCount();

  const freeBedExists = useCallback(
    () => emptyBedCount(bedCount, bedListLength) > 0,
    [bedCount, bedListLength, emptyBedCount]
  );

  return freeBedExists;
};

export default useFreeBedExists;
