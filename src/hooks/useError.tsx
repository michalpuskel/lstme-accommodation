import { useState } from "react";
import { IError } from "../interfaces/IError";

const useError = () => {
  const [error, setError] = useState<IError | null>(null);

  return { error, setError };
};

export default useError;
