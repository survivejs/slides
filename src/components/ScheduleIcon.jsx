import React from "react";
import PropTypes from "prop-types";
import emoji from "react-easy-emoji";
import scheduleTypes from "./schedule-types";

const ScheduleIcon = ({ type }) =>
  scheduleTypes[type] ? (
    <span title={scheduleTypes[type].title}>
      {emoji(scheduleTypes[type].icon)}
    </span>
  ) : null;
ScheduleIcon.propTypes = {
  type: PropTypes.string
};

export default ScheduleIcon;
