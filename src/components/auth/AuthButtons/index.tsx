import React, {
  useCallback,
  ReactElement,
  Dispatch,
  SetStateAction
} from "react";

import "./AuthButtons.scss";
import { EButtonElement } from "../../../@types";
import { EAuthType } from "../../../@types/auth";
import { submitButtonLabel, navButtonLabel } from "../../../helpers/auth";

import Button from "./Button";

interface AuthButtonsProps {
  authType: EAuthType;
  setAuthType: Dispatch<SetStateAction<EAuthType>>;
  hasErrors: boolean;
}

const AuthButtons = ({
  authType,
  setAuthType,
  hasErrors
}: AuthButtonsProps): ReactElement => {
  const navHandler = useCallback(
    (): void =>
      setAuthType(
        authType === EAuthType.LOGIN ? EAuthType.REGISTRATION : EAuthType.LOGIN
      ),
    [authType, setAuthType]
  );

  return (
    <div className="level auth__buttons">
      <div className="level-left">
        <Button
          element={EButtonElement.INPUT}
          color="is-success"
          type="submit"
          value={submitButtonLabel(authType)}
          disabled={hasErrors}
        />
      </div>

      <div className="level-right">
        <Button
          element={EButtonElement.BUTTON}
          color="is-light"
          type="button"
          value={navButtonLabel(authType)}
          onClick={navHandler}
        />
      </div>
    </div>
  );
};

export default AuthButtons;
