import { useState, useCallback } from "react";

const useToggleable = () => {
  const [value, setValue] = useState<boolean>(false);

  const toggle = useCallback<() => void>(() => setValue(!value), [value]);

  return { value, toggle };
};

export default useToggleable;
