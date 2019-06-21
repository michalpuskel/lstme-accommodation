import { IFormField, IForm } from "../@types/interfaces";

export const toHashMap = (form: IFormField[]): IForm =>
  form.reduce((acc: IForm, v: IFormField): IForm => {
    acc[v.field] = v;
    return acc;
  }, {});
