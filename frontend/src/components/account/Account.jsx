/* eslint-disable react/prop-types */
import React from "react";
import "./Account.css";

function Account({ user }) {
  return (
    <div className="account-container">
      {user && (user.firstname ? `${user.firstname}` : `${user.name}`)}
    </div>
  );
}

export default Account;
