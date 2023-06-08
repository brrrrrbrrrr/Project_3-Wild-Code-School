import { useEffect, useState } from "react";
import OfferValid from "../components/offerValid/OfferValid";
import useApi from "../services/useApi";

function PageValidationOffer() {
  const [offersValid, setOffersValid] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const api = useApi();

  useEffect(() => {
    api
      .get("/offers/valid", {
        params: {
          valid: 0,
        },
      })
      .then((response) => {
        setOffersValid(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [refresh]);

  return (
    <div className="pageSuperAdmin-container">
      <div className="pageSuperAdmin-selected_box">
        {offersValid.map((offerValid) => (
          <OfferValid
            key={offerValid.id}
            offer={offerValid}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        ))}
      </div>
    </div>
  );
}

export default PageValidationOffer;
