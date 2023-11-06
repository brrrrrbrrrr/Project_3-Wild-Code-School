import React from "react";
import { useUser } from "../contexts/UserContext";
import PageLikedOffers from "./PageLikedOffers";
import PageMyOffersEmploi from "./PageMyOffersEmploi";

function PageMyOffers() {
  const { user } = useUser();

  return (
    <div>
      {user.userType === "candidates" && <PageLikedOffers />}
      {user.userType === "recruiters" && <PageMyOffersEmploi />}
    </div>
  );
}

export default PageMyOffers;
