import { useCallback } from "react";

const useEmptyBedCount = () => {
  const getEmptyBedCount = useCallback((totalBedCount, usedBedCount) => {
    return totalBedCount - usedBedCount;
  }, []);

  return getEmptyBedCount;
};

export default useEmptyBedCount;
