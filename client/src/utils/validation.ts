import { Currency } from "../constants/currency";
import {
  USERNAME_REGEXP,
  PASSWORD_REGEXP,
  EMAIL_REGEXP,
  ADDRESS_REGEXP
} from "../constants/validation";

export const validateOrder = (order: any) => {
  if (typeof order !== "number" || order < 0 || Math.floor(order) !== order)
    return false;
  return true;
};
export const validatePizzaId = (id: any) => {
  if (typeof id !== "number" || id <= 0 || Math.floor(id) !== id) return false;
  return true;
};
export const validateCurrency = (currency: any) => {
  if (typeof Currency[currency] == "number") return true;
  return false;
};
export const validateUsername = (value: string) => {
  return value.match(USERNAME_REGEXP);
};
export const validatePassword = (value: string) => {
  return value.match(PASSWORD_REGEXP);
};
export const validateAddress = (value: string) => {
  return value.match(ADDRESS_REGEXP);
};
export const validateEmail = (value: string) => {
  return value.match(EMAIL_REGEXP);
};
