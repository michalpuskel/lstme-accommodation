import {
  IFormRegistrationState,
  IFormAuthAction
} from "../../@types";

const formRegistrationReducer = (
  state: IFormRegistrationState,
  action: IFormAuthAction
): IFormRegistrationState => ({
  ...state,
  [action.field]: action.value
});

export default formRegistrationReducer;
