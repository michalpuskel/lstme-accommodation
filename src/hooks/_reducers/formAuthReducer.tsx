import {
  IFormAuthState,
  IFormAuthUpdateFieldAction,
  IFormAuthUpdateFieldErrorsAction,
  IFormAuthResetFieldErrorsAction,
  EAuthAction
} from "../../@types/auth";

const formAuthReducer = (
  state: IFormAuthState,
  action:
  | IFormAuthUpdateFieldAction
  | IFormAuthUpdateFieldErrorsAction
  | IFormAuthResetFieldErrorsAction
): IFormAuthState => {
  switch (action.type) {
    case EAuthAction.UPDATE_FIELD:
      const fields = {
        ...state.fields,
        [action.payload.name]: action.payload.value
      };
      return { ...state, fields };

    case EAuthAction.UPDATE_FIELD_ERRORS:
      let errors;
      if (state.errors) {
        const fieldErrors = state.errors[action.payload.field];
        if (fieldErrors) {
          errors = {
            ...state.errors,
            [action.payload.field]: fieldErrors.concat(action.payload.error)
          };
        } else {
          errors = {
            ...state.errors,
            [action.payload.field]: [action.payload.error]
          };
        }
      } else {
        errors = { [action.payload.field]: [action.payload.error] };
      }
      return { ...state, errors };

    case EAuthAction.RESET_FIELD_ERRORS:
      if (state.errors) {
        const { [action.payload.field]: deleted, ...errors } = state.errors;
        return { ...state, errors };
      }
      return state;

    default:
      console.info("unknown action", action);
      return state;
  }
};

export default formAuthReducer;
