import { useCallback } from "react";

const useUnbreakableSpaces = () => {
  const glueFormat = useCallback(
    text => text && text.replace(" ", "\u00A0"),
    []
  );

  return glueFormat;
};

export default useUnbreakableSpaces;
