import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";

class Fish extends React.Component {
  static propTypes = {
    details: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string.isRequired,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number.isRequired
    }).isRequired,
    addToOrder: PropTypes.func.isRequired
  };

  render() {
    const { desc, image, name, price, status } = this.props.details;
    const isAvailable = status === "available";

    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button
          disabled={!isAvailable}
          onClick={() => this.props.addToOrder(this.props.index)}
        >
          {isAvailable ? "Add to Cart" : "Sold Out!"}
        </button>
      </li>
    );
  }
}

export default Fish;
