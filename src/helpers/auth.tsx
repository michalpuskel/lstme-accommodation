import { EAuthType, IFormAuthState } from "../@types/auth";

export const mainTitle = (authType: EAuthType): string =>
  authType === EAuthType.LOGIN ? "Prihlásenie" : "Registrácia";

export const submitButtonLabel = (authType: EAuthType): string =>
  authType === EAuthType.LOGIN ? "Prihlásiť" : "Registrovať";

export const navButtonLabel = (authType: EAuthType): string =>
  authType === EAuthType.LOGIN ? "Registrácia" : "Prihlásenie";

export const hasErrors = (formAuth: IFormAuthState): boolean =>
  !!formAuth.errors;
