/**
 * Gets the latest rates from the server.
 *
 * @returns Rates object when successful; undefined when unsuccessful.
 */
export const getMoneyRates = async () => {
  try {
    let response = await fetch("https://api.frankfurter.app/latest");
    if (response.ok) {
      let data = await response.json();
      if (data && data.rates && data.base) {
        data.rates[data.base] = 1;
        return data;
      }
    }
  } catch (e) {
    console.error(e);
  }
  return undefined;
};
