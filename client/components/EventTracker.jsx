/* react-over-scroll - MIT Copyright (c) 2016 Gregor Adams */
import React from "react";
import PropTypes from "prop-types";
import throttle from "lodash.throttle";
import root from "window-or-global";

class EventTracker extends React.Component {
  /**
   * A simple tracker for `window.scrollY`
   * @param {Object} props
   * @param {Function} props.onScroll - eventListener
   * @param {Number} props.throttleRate=0 - throttling rate in milliseconds
   */
  constructor(props) {
    super(props);
    this.state = {};
    this.trackScroll = this.trackScroll.bind(this);
  }

  trackScroll() {
    this.props.onScroll(root.scrollY);
  }

  componentDidMount() {
    // store so we can unbind properly in unmount
    this.throttledCallback = this.trackScroll;
    if (this.props.throttleRate > 0) {
      this.throttledCallback = throttle(
        this.trackScroll,
        this.props.throttleRate
      );
    }

    root.document &&
      root.document.addEventListener("scroll", this.throttledCallback);
  }

  componentWillUnmount() {
    root.document &&
      root.document.removeEventListener("scroll", this.throttledCallback);
  }

  render() {
    return null;
  }
}
EventTracker.propTypes = {
  onScroll: PropTypes.func.isRequired,
  throttleRate: PropTypes.number
};
EventTracker.defaultProps = {
  throttleRate: 0
};

export default EventTracker;
