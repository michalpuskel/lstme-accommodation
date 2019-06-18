import { IFormLoginState, IFormAuthAction } from "../../@types/interfaces";

const formLoginReducer = (state: IFormLoginState, action: IFormAuthAction) => ({
  ...state,
  [action.field]: action.value
});

export default formLoginReducer;
