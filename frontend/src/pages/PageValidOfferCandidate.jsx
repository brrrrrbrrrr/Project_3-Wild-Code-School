import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import Candidate from "../components/superAdmin/candidate/Candidate";
import OfferEmploi from "../components/offersEmploi/offerEmpoi/OfferEmploi";
import "./PageMyOffersEmploi";
import useApi from "../services/useApi";
import "./PageValidOfferCandidate.css";

function PageValidOfferCandidate() {
  const api = useApi();
  const { candidateWithLike, validationStatus } = useUser();
  const [candidateData, setCandidateData] = useState([]);
  const [offerData, setOfferData] = useState([]);
  const [idOffer, setIdOffer] = useState("");
  const validStatus = candidateWithLike.valide;
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");

  useEffect(() => {
    api
      .get(
        `/admin/offer-status/${validStatus}/candidate/${candidateWithLike.id}`
      )
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setCandidateData(res.data[0]);
          setIdOffer(res.data[0].likeOfferIds);
          setName(res.data[0].name);
          setFirstname(res.data[0].firstname);
        } else {
          setCandidateData(undefined);
          setIdOffer(undefined);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [validationStatus]);

  useEffect(() => {
    if (idOffer) {
      const offerIds = idOffer.split(",").map(Number);
      const requests = offerIds.map((offerId) => api.get(`/offers/${offerId}`));

      Promise.all(requests)
        .then((responses) => {
          const offersDatas = responses.map((res) => res.data);

          setOfferData(offersDatas);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [idOffer, validationStatus]);

  return idOffer === undefined && candidateData === undefined ? (
    <h1 className="no-like_h1">
      Vous avez validé tous les likes pour :{" "}
      <span className="name-candidate">
        {firstname} {name}
      </span>
    </h1>
  ) : (
    <div>
      <div className="page-valid-offer-candidate_container">
        <h1 className="candidate-title">Le candidat :</h1>
        <Candidate candidate={candidateData} />

        {offerData && offerData.length === 1 && (
          <>
            <h2 className="offre-title">A liké cette offre : </h2>
            <OfferEmploi
              offer={offerData[0]}
              candidateId={candidateWithLike.id}
              validStatus={validStatus}
            />
          </>
        )}

        {offerData && offerData.length > 1 && (
          <h2 className="offre-title">A liké ces offres : </h2>
        )}
        {offerData &&
          offerData.length > 1 &&
          offerData.map((item) => {
            return (
              <OfferEmploi
                offer={item} //
                candidateId={candidateWithLike.id}
                key={item.id}
                validStatus={validStatus}
              />
            );
          })}
      </div>
    </div>
  );
}

export default PageValidOfferCandidate;
