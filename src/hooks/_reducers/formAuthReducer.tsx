import {
  IFormAuthState,
  IFormAuthUpdateFieldAction,
  IFormAuthUpdateFieldErrorsAction,
  EAuthAction,
  IFormAuthFields
} from "../../@types/typings";

const formAuthReducer = (
  state: IFormAuthState,
  action: IFormAuthUpdateFieldAction | IFormAuthUpdateFieldErrorsAction
): IFormAuthState => {
  switch (action.type) {
    case EAuthAction.UPDATE_FIELD:
      const fields: IFormAuthFields = {
        ...[state.fields],
        [action.payload.name]: action.payload.value
      };
      return {
        ...state,
        fields
      };

    case EAuthAction.UPDATE_FIELD_ERRORS:
      return state; // todo

    default:
      return state;
  }
};

export default formAuthReducer;
