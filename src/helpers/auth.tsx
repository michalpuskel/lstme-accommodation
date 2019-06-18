import { IFormField, IForm } from "../@types/interfaces";

export const toHashMap = (form: IFormField[]): IForm =>
  form.reduce((acc: any, v: IFormField) => {
    acc[v.field] = v;
    return acc;
  }, {});
