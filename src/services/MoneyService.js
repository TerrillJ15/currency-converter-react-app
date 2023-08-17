/**
 * Gets the latest rates from the server.
 *
 * @param base The base currency to retrieve rates for. Defaults to 'USD'
 * @returns Rates object when successful; undefined when unsuccessful.
 */
export const getMoneyRatesByBase = async (base = "USD") => {
  try {
    let response = await fetch(
      `https://api.frankfurter.app/latest?from=${base}`
    );
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

export const getHistoricalRates = async (startDate, endDate, from, to) => {
  try {
    let response = await fetch(
      `https://api.frankfurter.app/${startDate}..${endDate}?from=${from}&to=${to}`
    );
    if (response.ok) {
      let data = await response.json();
      if (data && data.rates) {
        return data;
      }
    }
  } catch (e) {
    console.error(e);
  }
  return undefined;
};
