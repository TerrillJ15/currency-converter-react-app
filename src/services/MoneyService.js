/**
 * Gets the latest rates from the server.
 *
 * @returns Rates object when successful; undefined when unsuccessful.
 */
export const getRates = async () => {
  let response = await fetch("https://api.frankfurter.app/latest");
  if (response.ok) {
    let data = await response.json();
    if (data && data.rates) {
      return data.rates;
    }
  }
  return undefined;
};
