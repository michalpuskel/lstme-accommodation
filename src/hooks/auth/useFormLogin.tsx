import { useReducer, useCallback } from "react";

import {
  IFormLogin,
  IFormField,
  IFormLoginState
} from "../../@types/typings";

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

  // const toHashMap = (form: IFormField[]): IForm =>
  //   form.reduce((acc: IForm, v: IFormField): IForm => {
  //     acc[v.name] = v;
  //     return acc;
  //   }, {});

  const formLogin = Object.keys(fields).reduce(
    (form: IFormLogin, field: keyof IFormLogin): IFormLogin => {
      // (form: IFormLogin, field: string): IFormLogin => {

      form["lb"] = {
        name: "field",
        value: "val",
        onChange: changeHandler,
        id: `${field}Input`
      };

      form[field as string] = {
        name: field,
        value: fields[field as keyof IFormLoginState],
        onChange: changeHandler,
        id: `${field}Input`
      };
      return form;
    },
    {}
  );

  // return formLogin;
  return formLogin as IFormLogin;
};

export default useFormLogin;
