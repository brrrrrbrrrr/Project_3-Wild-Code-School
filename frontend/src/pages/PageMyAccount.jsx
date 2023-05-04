import React from "react";
import { useUser } from "../contexts/UserContext";
import UsersInformations from "../components/usersInformations/UsersInformations";

function PageMyAccount() {
  const { user } = useUser();

  return (
    <div>
      <button type="button">Mon compte</button>
      <button type="button">Paramètre</button>
      <UsersInformations user={user} />
    </div>
  );
}

export default PageMyAccount;
