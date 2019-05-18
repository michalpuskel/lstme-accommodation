import { useCallback } from "react";

const useCheckPasswordConfirmed = () => {
  const checkPasswordConfirmed = useCallback(
    ({ passwordInput, passwordConfirmInput }) => {
      return passwordInput !== passwordConfirmInput;
    },
    []
  );

  return checkPasswordConfirmed;
};

export default useCheckPasswordConfirmed;
