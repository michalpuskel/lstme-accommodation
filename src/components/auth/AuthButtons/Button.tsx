import React, { ReactElement } from "react";
import { EButtonElement } from "../../../@types";

interface IButtonProps {
  element: EButtonElement;

  color: "is-success" | "is-light";
  type: "button" | "submit" | "reset";
  value: string;

  disabled?: boolean;
  onClick?: () => void;
}

const Button = (props: IButtonProps): ReactElement => (
  <div className="level-item">
    <div className="field">
      <div className="control">
        {props.element === EButtonElement.INPUT ? (
          <input
            className={`button ${props.color}`}
            type={props.type}
            value={props.value}
            disabled={props.disabled}
            onClick={props.onClick}
          />
        ) : (
          <button
            className={`button ${props.color}`}
            type={props.type}
            disabled={props.disabled}
            onClick={props.onClick}
          >
            {props.value}
          </button>
        )}
      </div>
    </div>
  </div>
);

export default Button;
