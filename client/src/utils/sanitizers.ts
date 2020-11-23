import { Pizza } from "../interfaces/Pizza";
import { validateOrder, validatePizzaId } from "./validation";
import { Currency } from "../constants/currency";

export const pullToLocalStorage = (pull: Pizza[]) => {
  return JSON.stringify(
    pull
      .filter(p => p.order)
      .map(p => ({
        order: +p.order,
        id: +p.id
      }))
  );
};
export const localStorageToPull = (data: string | null) => {
  if (typeof data !== "string") return [];

  const parsedData: {
    order: number;
    id: number;
  }[] = JSON.parse(data);

  if (!Array.isArray(parsedData)) return [];

  return parsedData.filter(
    pizza => validateOrder(pizza.order) && validatePizzaId(pizza.id)
  );
};
export const localStorageToCurrency = (
  data: string | null
): Currency | null => {
  if (typeof data !== "string") return null;
  return +data;
};
export const currencyToDisplayName = (currency: Currency): string => {
  if (currency === Currency.USD) return "USD";
  return "EUR";
};
