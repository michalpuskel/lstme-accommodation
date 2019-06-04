import { useCallback } from "react";

const useEmptyBedCount = () => {
  const getEmptyBedCount = useCallback(
    (totalBedCount, usedBedCount) => totalBedCount - usedBedCount,
    []
  );

  return getEmptyBedCount;
};

export default useEmptyBedCount;
