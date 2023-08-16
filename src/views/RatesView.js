import React from "react";
import { getMoneyRatesByBase } from "../services/MoneyService";
const money = require("money");

/**
 * The main view for the rates page.
 */
export default class RatesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rates: {},
      error: "",
      amount: undefined,
      from: "USD", // also the base
      to: "EUR",
      result: "--",
    };

    // register the handlers with the component so the DOM can call them
    this.onChange = this.onChange.bind(this);
    this.onFlip = this.onFlip.bind(this);
  }

  /**
   * Retrieves the rates when the page is loaded.
   */
  async componentDidMount() {
    await this.retrieveRates();
  }

  /**
   * Retrieves the rates from server and populates the money package with them.
   * Uses the current from value as the base value for the rates.
   * Updates the state of the view with the new rates.
   */
  async retrieveRates() {
    const moneyRates = await getMoneyRatesByBase(this.state.from);
    let error = undefined;
    if (moneyRates) {
      money.rates = moneyRates.rates;
      money.base = moneyRates.base;
    } else {
      error = "Unable to retrieve rates.";
    }
    this.setState({ rates: moneyRates?.rates, error });
  }

  /**
   * Calculates the result based on the enter amount, selected from and selected to.
   */
  calculateResult() {
    let result = "--";
    if (this.state.amount !== "" && !isNaN(this.state.amount)) {
      result = `${money(this.state.amount)
        .from(this.state.from)
        .to(this.state.to)
        .toFixed(2)}`;
    }
    this.setState({ result });
  }

  /**
   * Handles when a control is updated to update the data value with the new value.
   *
   * @param {Event} event The change event containing the target and the new value.
   * @param {String} key The key name of the data value to update.
   * @param {Boolean} retrieveRates True if the rates should be retrieved after the state is updated.
   */
  onChange(event, key, retrieveRates) {
    this.setState({ [key]: event.target.value }, async () => {
      if (retrieveRates) {
        await this.retrieveRates();
      }
      this.calculateResult();
    });
  }

  /**
   * Handles when the flip button is clicked to invert the to and from value.
   */
  onFlip() {
    const to = this.state.from;
    const from = this.state.to;
    this.setState({ to, from }, async () => {
      await this.retrieveRates();
      this.calculateResult();
    });
  }

  /**
   * @returns The template to render.
   *          If there was an error retrieving rates, display it.
   *          Otherwise, display the rates page with the inputs,
   *          result, and the exchange rates table.
   */
  render() {
    // deconstruct the state of the data; state changes will rerender the page
    const { rates, error, amount, to, from, result } = this.state;

    // determine the page state
    let page = undefined;
    if (!!error) {
      // there was an error, so display it
      return (
        <div class="alert alert-danger" role="alert">
          {error}
        </div>
      );
    } else if (rates) {
      // has rates, so render the rates page
      let rateOptions = [];
      let tableRows = [];
      // loop through the rates in alphabetical order to build the dropdown options and the exchange table
      for (const rate of Object.keys(rates).sort((a, b) =>
        a.localeCompare(b)
      )) {
        rateOptions.push(<option value={rate}>{rate}</option>);
        tableRows.push(
          <tr>
            <td>{rate}</td>
            <td>{rates[rate]}</td>
          </tr>
        );
      }

      // apply the template to render for the rates page with the rates
      page = (
        <div>
          <div className="row no-gutters">
            <div className="col">
              <div class="form-floating">
                <input
                  type="number"
                  class="form-control"
                  id="text-amount"
                  placeholder="0.00"
                  value={amount}
                  onChange={(event) => this.onChange(event, "amount")}
                ></input>
                <label for="text-amount">Amount</label>
              </div>
            </div>
            <div class="col-12 col-md-auto pt-2 pt-md-0">
              <div class="form-floating">
                <select
                  class="form-select"
                  id="select-from"
                  aria-label="From"
                  value={from}
                  onChange={(event) => this.onChange(event, "from", true)}
                >
                  {rateOptions}
                </select>
                <label for="select-from">From</label>
              </div>
            </div>
            <div class="col-12 col-md-auto pt-2 pt-md-0 text-center">
              <button
                type="button"
                class="btn btn-primary rounded-4"
                onClick={this.onFlip}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="44"
                  height="44"
                  fill="currentColor"
                  class="bi bi-arrow-left-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"
                  ></path>
                </svg>
              </button>
            </div>
            <div class="col-12 col-md-auto pt-2 pt-md-0">
              <div class="form-floating">
                <select
                  class="form-select"
                  id="select-to"
                  aria-label="To"
                  value={to}
                  onChange={(event) => this.onChange(event, "to")}
                >
                  {rateOptions}
                </select>
                <label for="select-to">To</label>
              </div>
            </div>
          </div>
          <div className="row no-gutters pt-4">
            <div className="col text-center">
              <h5>Result</h5>
              <h1>{result}</h1>
            </div>
          </div>
          <div className="row no-gutters pt-4">
            <div className="col-12 col-md-4 offset-md-4 text-center">
              <h5>Exchange Rates (Based from {from})</h5>
              <table className="table">
                <thead>
                  <tr>
                    <th>Currency</th>
                    <th>Rate</th>
                  </tr>
                </thead>
                <tbody>{tableRows}</tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    // return the template to render with the conditional templates
    return page;
  }
}
