import { useCallback } from "react";

const useEmptyBeds = () => {
  const generateEmptyBeds = useCallback(
    count => Array.from({ length: count }, (_, index) => index),
    []
  );

  return generateEmptyBeds;
};

export default useEmptyBeds;
