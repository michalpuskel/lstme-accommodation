import {
  IFormAuthState,
  IFormAuthUpdateFieldAction,
  IFormAuthUpdateFieldErrorsAction,
  EAuthAction,
  IFormAuthStateFields
} from "../../@types/auth";

const formAuthReducer = (
  state: IFormAuthState,
  action: IFormAuthUpdateFieldAction | IFormAuthUpdateFieldErrorsAction
): IFormAuthState => {
  switch (action.type) {
    case EAuthAction.UPDATE_FIELD:
      const fields = ({
        ...[state.fields],
        [action.payload.name]: action.payload.value
      } as unknown) as IFormAuthStateFields;
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
