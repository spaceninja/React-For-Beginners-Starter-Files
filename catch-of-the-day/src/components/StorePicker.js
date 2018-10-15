import React from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  myInput = React.createRef();

  static propTypes = {
    history: PropTypes.object.isRequired
  };

  goToStore = e => {
    // 1. stop form from submitting
    e.preventDefault();
    // 2. get the text from that input
    const storeName = this.myInput.value.value;
    // 3. change page to /store/whatever-they-entered
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter a Store</h2>
        <input
          defaultValue={getFunName()}
          placeholder="Store Name"
          ref={this.myInput}
          required
          type="text"
        />
        <button>Visit Store ></button>
      </form>
    );
  }
}

export default StorePicker;
