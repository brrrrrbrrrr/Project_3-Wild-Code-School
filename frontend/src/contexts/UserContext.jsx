/* eslint-disable react/jsx-no-constructed-context-values */

import { useState, useContext, createContext } from "react";
import PropTypes from "prop-types";
// Définir mon contexte utilisateur
const UserContext = createContext(null);

// Création du provider
function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userParam, setUserParam] = useState(null);
  const [selectForm, setSelectForm] = useState(null);
  const [newName, setNewName] = useState(null);
  const [offerData, setOfferData] = useState(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userParam,
        setUserParam,
        selectForm,
        setSelectForm,
        newName,
        setNewName,
        offerData,
        setOfferData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
// Création de mon hook personnalisé
export const useUser = () => useContext(UserContext);
// Export du provider
export default UserProvider;
