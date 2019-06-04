import { useCallback } from "react";

const useTrue = () => {
  const trueFunction = useCallback(() => true, []);

  return trueFunction;
};

export default useTrue;
