import React, { useEffect, useState } from "react";
import "./Account.css";
import PropTypes from "prop-types";
import useApi from "../../services/useApi";

function Account({ user, newName }) {
  const [name, setName] = useState("");
  const api = useApi();

  useEffect(() => {
    if (user)
      api.get(`${user?.userType}/${user?.id}`).then((res) => {
        if (user?.userType === "compagny") {
          setName(res.data.name);
        } else {
          setName(res.data.firstname);
        }
      });
  }, [user, newName]);

  return <div className="account-container">{name}</div>;
}

Account.propTypes = {
  user: PropTypes.shape({
    firstname: PropTypes.string,
    name: PropTypes.string,
    userType: PropTypes.string,
    id: PropTypes.string,
  }),

  newName: PropTypes.string,
};

Account.defaultProps = {
  newName: null,
  user: null,
};
export default Account;
