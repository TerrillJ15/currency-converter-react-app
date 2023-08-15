import React from "react";
import { getRates } from "../services/MoneyService";

export default class RatesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: "",
      rates: {},
      error: "",
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const rates = await getRates();
    let error = undefined;
    if (!rates) {
      error = "Unable to retrieve rates.";
    }
    this.setState({ isLoading: false, rates, error });
  }

  render() {
    const { isLoading, rates, error } = this.state;
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
        <div className="row no-gutters">
          <div className="col">
            <div class="form-floating">
              <input
                type="number"
                class="form-control"
                id="text-amount"
                placeholder="0.00"
              ></input>
              <label for="text-amount">Amount</label>
            </div>
          </div>
          <div class="col-auto">
            <div class="form-floating">
              <select class="form-select" id="select-from" aria-label="From">
                {rateOptions}
              </select>
              <label for="select-from">From</label>
            </div>
          </div>
          <div class="col-auto">
            <button type="button" class="btn btn-primary rounded-4">
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
              <select class="form-select" id="select-to" aria-label="To">
                {rateOptions}
              </select>
              <label for="select-to">To</label>
            </div>
          </div>
        </div>
      );
    }
    return <div className="container pt-4">{page}</div>;
  }
}
