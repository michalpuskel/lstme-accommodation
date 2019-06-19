import { useReducer, useCallback } from "react";

import { IFormLoginState, IFormLogin } from "../../@types/interfaces";
import formLoginReducer from "../_reducers/formLoginReducer";
import { toHashMap } from "../../helpers/auth";

const useFormLogin = (): IFormLogin => {
  const [fields, dispatch] = useReducer(formLoginReducer, {
    email: "",
    password: ""
  });

  const formLogin = Object.keys(fields).map((field: string) => ({
    field,
    input: fields[field as keyof IFormLoginState],
    handler: useCallback(
      event => dispatch({ field, value: event.target.value }),
      []
    ),
    id: `${field}Input`
  }));

  return toHashMap(formLogin) as IFormLogin;
};

export default useFormLogin;
