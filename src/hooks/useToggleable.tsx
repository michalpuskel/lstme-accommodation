import { useState, useCallback } from "react";

import { IToggleable } from "../@types/interfaces";

const useToggleable = (): IToggleable => {
  const [value, setValue] = useState<boolean>(false);

  const toggle = useCallback((): void => setValue(!value), [value]);

  return { value, toggle };
};

export default useToggleable;
