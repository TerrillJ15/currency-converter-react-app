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
    return (
      <div className="container">
        isLoading: {isLoading ? "true" : "false"}
        <br />
        rates: {JSON.stringify(rates)}
        <br />
        error: {error}
      </div>
    );
  }
}
