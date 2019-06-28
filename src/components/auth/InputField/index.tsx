import React from "react";
import cx from "classnames";

import { IError } from "../../../@types";
import { IFormAuthFields } from "../../../@types/auth";

import Icon, { IIconProps } from "./Icon";
import ErrorMessage from "./ErrorMessage";

interface IInputFieldProps {
  name: keyof IFormAuthFields;
  value: string;
  onChange: () => void;

  id: string;
  label: string;
  type: "email" | "password" | "text" | "date";
  placeholder?: string;

  iconLeft?: IIconProps;
  iconRight?: IIconProps;

  checking?: boolean;
  errors?: IError[];
}

const InputField = ({
  name,
  value,
  onChange,

  id,
  label,
  type,
  placeholder,

  iconLeft,
  iconRight,

  checking,
  errors
}: IInputFieldProps) => (
  <div className="field">
    <label className="label" htmlFor={id}>
      {label}
    </label>

    <div
      className={cx("control", {
        "has-icons-left": iconLeft,
        "has-icons-right": iconRight
      })}
    >
      <input
        className={cx("input", {
          "is-success": checking && !errors,
          "is-danger": errors
        })}
        name={name}
        value={value}
        id={id}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        required
      />

      {iconLeft && <Icon {...iconLeft} />}
      {iconRight && <Icon {...iconRight} />}
    </div>

    {errors &&
      errors.map(error => <ErrorMessage message={error.data.message} />)}
  </div>
);

export default InputField;
