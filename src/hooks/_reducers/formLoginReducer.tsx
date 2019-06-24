import { IFormAuthState, IFormAuthAction } from "../../@types";

const formLoginReducer = (
  state: IFormLoginState,
  action: IFormAuthAction
): IFormLoginState => ({
  ...state,
  [action.field]: action.value
});

export default formLoginReducer;
