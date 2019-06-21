import { useReducer, useCallback } from "react";

import {
  IFormLogin,
  IFormField,
  IFormLoginState
} from "../../@types/interfaces";

import formLoginReducer from "../_reducers/formLoginReducer";
import { toHashMap } from "../../helpers/auth";

const useFormLogin = (): IFormLogin => {
  const [fields, dispatch] = useReducer(formLoginReducer, {
    email: "",
    password: ""
  });

  const changeHandler = useCallback(
    (name, value: string): void => dispatch({ field: name, value }),
    []
  );

  // const hash = {};
  // const formLogin = Object.keys(fields).forEach(key => {});

  const formLogin = Object.keys(fields).map(
    (field: string): IFormField => ({
      name: field,
      value: fields[field as keyof IFormLoginState],
      onChange: changeHandler,
      id: `${field}Input`
    })
  );

  return toHashMap(formLogin) as IFormLogin;
};

export default useFormLogin;
