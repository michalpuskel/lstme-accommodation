import { IFormField, IForm } from "../@types";

export const toHashMap = (form: IFormField[]): IForm =>
  form.reduce((acc: IForm, v: IFormField): IForm => {
    acc[v.name] = v;
    return acc;
  }, {});
