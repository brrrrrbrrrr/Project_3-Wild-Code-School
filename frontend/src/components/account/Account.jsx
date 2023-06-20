import React from "react";
import "./Account.css";
import PropTypes from "prop-types";

function Account({ user, newName }) {
  if (user?.name && !user.firstname) {
    return <div className="account-container">{user?.name}</div>;
  }
  if (newName) {
    return <div className="account-container">{newName}</div>;
  }
  if (user) {
    return (
      <div className="account-container">
        {user.firstname ? `${user.firstname}` : `${user.name}`}
      </div>
    );
  }
}

Account.propTypes = {
  user: PropTypes.shape({
    firstname: PropTypes.string,
    name: PropTypes.string,
  }),

  newName: PropTypes.string,
};

Account.defaultProps = {
  newName: null,
  user: null,
};
export default Account;
