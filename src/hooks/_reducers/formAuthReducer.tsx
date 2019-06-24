import {
  IFormAuthState,
  IFormAuthUpdateFieldAction,
  IFormAuthUpdateFieldErrorsAction,
  EAuthAction
} from "../../@types/auth";

const formAuthReducer = (
  state: IFormAuthState,
  action: IFormAuthUpdateFieldAction | IFormAuthUpdateFieldErrorsAction
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

    default:
      console.info("unknown action", action);
      return state;
  }
};

export default formAuthReducer;
