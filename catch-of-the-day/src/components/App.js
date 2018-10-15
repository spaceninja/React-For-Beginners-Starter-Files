import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import Fish from "./Fish";
import sampleFishes from "../sample-fishes";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object
  };

  addFish = fish => {
    // 1. take a copy of the current state to avoid mutation
    const fishes = { ...this.state.fishes };
    // 2. add new fish to the state copy
    fishes[`fish${Date.now()}`] = fish;
    // 3. write the state copy back to state
    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
    // 1. take a copy of the current state to avoid mutation
    const fishes = { ...this.state.fishes };
    // 2. update fish in the state copy
    fishes[key] = updatedFish;
    // 3. write the state copy back to state
    this.setState({ fishes });
  };

  deleteFish = key => {
    // 1. take a copy of the current state to avoid mutation
    const fishes = { ...this.state.fishes };
    // 2. remove fish from the state copy
    fishes[key] = null; // firebase wants this set to `null` rather than deleted
    // 3. write the state copy back to state
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = key => {
    // 1. take a copy of state
    const order = { ...this.state.order };
    // 2. either add to the order or update the quantity being ordered
    order[key] = order[key] + 1 || 1;
    // 3. call setState to update our state object
    this.setState({ order });
  };

  removeFromOrder = key => {
    // 1. take a copy of the current state to avoid mutation
    const order = { ...this.state.order };
    // 2. reduce quantity or remove item from the state copy
    if (order[key] === 1) {
      delete order[key];
    } else {
      order[key] = order[key] - 1;
    }
    // 3. write the state copy back to state
    this.setState({ order });
  };

  componentDidMount() {
    const { params } = this.props.match;
    // first reinstate our localstorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                addToOrder={this.addToOrder}
                details={this.state.fishes[key]}
                index={key}
                key={key}
              />
            ))}
          </ul>
        </div>
        <Order
          removeFromOrder={this.removeFromOrder}
          fishes={this.state.fishes}
          order={this.state.order}
        />
        <Inventory
          addFish={this.addFish}
          deleteFish={this.deleteFish}
          fishes={this.state.fishes}
          loadSampleFishes={this.loadSampleFishes}
          updateFish={this.updateFish}
        />
      </div>
    );
  }
}

export default App;
