import React from "react";
import { getMoneyRates } from "../services/MoneyService";
const money = require("money");

export default class RatesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      rates: {},
      error: "",
      amount: undefined,
      from: "USD",
      to: "EUR",
      result: "--",
    };
    this.onChange = this.onChange.bind(this);
    this.onFlip = this.onFlip.bind(this);
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const moneyRates = await getMoneyRates();
    let error = undefined;
    if (moneyRates) {
      money.rates = moneyRates.rates;
      money.base = moneyRates.base;
    } else {
      error = "Unable to retrieve rates.";
    }
    this.setState({ isLoading: false, rates: moneyRates?.rates, error });
  }

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

  onChange(event, key) {
    this.setState({ [key]: event.target.value }, this.calculateResult);
  }

  onFlip() {
    const to = this.state.from;
    const from = this.state.to;
    this.setState({ to, from }, this.calculateResult);
  }

  render() {
    const { isLoading, rates, error, amount, to, from, result } = this.state;
    let page = undefined;
    if (!!error) {
      return (
        <div class="alert alert-danger" role="alert">
          {error}
        </div>
      );
    } else if (rates) {
      const rateOptions = Object.keys(rates).map((rate) => {
        return <option value={rate}>{rate}</option>;
      });
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
            <div class="col-auto">
              <div class="form-floating">
                <select
                  class="form-select"
                  id="select-from"
                  aria-label="From"
                  value={from}
                  onChange={(event) => this.onChange(event, "from")}
                >
                  {rateOptions}
                </select>
                <label for="select-from">From</label>
              </div>
            </div>
            <div class="col-auto">
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
            <div class="col-auto">
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
        </div>
      );
    }
    return <div className="container pt-4">{page}</div>;
  }
}
