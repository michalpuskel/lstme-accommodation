import { IFormLoginState, IFormAuthAction } from "../../@types/typings";

const formLoginReducer = (
  state: IFormLoginState,
  action: IFormAuthAction
): IFormLoginState => ({
  ...state,
  [action.field]: action.value
});

export default formLoginReducer;
