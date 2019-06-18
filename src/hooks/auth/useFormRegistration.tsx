import { useReducer, useCallback } from "react";

import { IFormRegistrationState } from "../../@types/interfaces";
import formRegistrationReducer from "../_reducers/formRegistrationReducer";
import { toHashMap } from "../../helpers/auth";

const useFormRegistration = () => {
  const [fields, dispatch] = useReducer(formRegistrationReducer, {
    passwordConfirm: "",
    firstName: "",
    lastName: "",
    birthDate: ""
  });

  const formRegistration = Object.keys(fields).map((field: string) => ({
    field,
    input: fields[field as keyof IFormRegistrationState],
    handler: useCallback(
      event => dispatch({ field, value: event.target.value }),
      []
    ),
    id: `${field}Input`
  }));

  return toHashMap(formRegistration);
};

export default useFormRegistration;
