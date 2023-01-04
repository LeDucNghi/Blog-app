import PropTypes from "prop-types";
import React from "react";

NotFound.propTypes = {
  title: PropTypes.string,
};

NotFound.defaultProps = {
  title: "Page not found 404 ...",
};

function NotFound({ title }) {
  return <div>{title} </div>;
}

export default NotFound;
