/* eslint-disable react/function-component-definition */

import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import { useEffect, useState } from "react";
import Candidate from "../components/superAdmin/candidate/Candidate";
import Offer from "../components/superAdmin/offer/Offer";
import Enterprise from "../components/superAdmin/enterprise/Enterpise";
import Consultant from "../components/superAdmin/consultant/Consultant";
import useApi from "../services/useApi";
import { useUser } from "../contexts/UserContext";

import "./PageSuperAdmin.css";

const PageSuperAdmin = () => {
  const { user } = useUser();
  if (!user || !user.superAdmin) {
    return (
      <p>
        Accès refusé. Seuls les super administrateurs peuvent accéder à cette
        page.
      </p>
    );
  }
  const [candidate, setCandidate] = useState("");
  const [offer, setOffer] = useState("");
  const [enterprise, setEnterprise] = useState("");
  const [consultant, setConsultant] = useState("");
  const [allCandidates, setAllCandidates] = useState([]);
  const [allOffers, setAllOffers] = useState([]);
  const [allEnterprises, setAllEnterprises] = useState([]);
  const [allConsultant, setAllConsultant] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const api = useApi();

  const handleChangeCandidate = (event) => {
    setCandidate(event.target.value);
    setOffer("");
    setEnterprise("");
    setConsultant("");
    setActiveSection("candidates");
  };
  const handleChangeOffer = (event) => {
    setOffer(event.target.value);
    setCandidate("");
    setEnterprise("");
    setConsultant("");
    setActiveSection("offres");
  };
  const handleChangeEnterprise = (event) => {
    setEnterprise(event.target.value);
    setCandidate("");
    setOffer("");
    setConsultant("");
    setActiveSection("enterprises");
  };
  const handleChangeConsultant = (event) => {
    setConsultant(event.target.value);
    setCandidate("");
    setOffer("");
    setEnterprise("");
    setActiveSection("consultants");
  };

  useEffect(() => {
    if (candidate === 10) {
      api
        .get("/candidates")
        .then((response) => {
          setAllCandidates(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [candidate]);

  useEffect(() => {
    if (offer === 10) {
      api
        .get("/offers/findall")
        .then((response) => {
          setAllOffers(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (offer === 20) {
      api
        .get("/offers/valid", {
          params: {
            valid: 1,
          },
        })
        .then((response) => {
          setAllOffers(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (offer === 30) {
      api
        .get("/offers/valid", {
          params: {
            valid: 0,
          },
        })
        .then((response) => {
          setAllOffers(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [offer, refresh]);
  useEffect(() => {
    if (enterprise === 10) {
      api
        .get("/compagny")
        .then((response) => {
          setAllEnterprises(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [enterprise]);
  useEffect(() => {
    if (consultant === 10) {
      api
        .get("/consultants")
        .then((response) => {
          setAllConsultant(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [consultant]);

  return (
    <div className="pageSuperAdmin-container">
      <div className="pageSuperAdmin-selected_box">
        <Box sx={{ width: 200 }} className="pageSuperAdmin-selected_candidate">
          <FormControl fullWidth>
            <InputLabel id="candidate-label">Candidats</InputLabel>
            <Select
              labelId="candidate-label"
              id="candidate-select"
              value={candidate}
              label="Candidate"
              onChange={handleChangeCandidate}
            >
              <MenuItem value={10}>Candidats</MenuItem>
              <MenuItem value={20}>Mes Candidats</MenuItem>
              <MenuItem value={30}>En attente</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ width: 200 }} className="pageSuperAdmin-selected_offer">
          <FormControl fullWidth>
            <InputLabel id="offer-label">Offres</InputLabel>
            <Select
              labelId="offer-label"
              id="offer-select"
              value={offer}
              label="Offer"
              onChange={handleChangeOffer}
            >
              <MenuItem value={10}>Toutes les offres</MenuItem>
              <MenuItem value={20}>Offres validé</MenuItem>
              <MenuItem value={30}>Offres en attente</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ width: 200 }} className="pageSuperAdmin-selected_enterprise">
          <FormControl fullWidth>
            <InputLabel id="enterprise-label">Enterprises</InputLabel>
            <Select
              labelId="enterprise-label"
              id="enterprise-select"
              value={enterprise}
              label="enterprise"
              onChange={handleChangeEnterprise}
            >
              <MenuItem value={10}>Enterprises</MenuItem>
              <MenuItem value={20}>Mes Enterprises</MenuItem>
              <MenuItem value={30}>En attente</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{ width: 200 }}
          className="pageSuperAdmin-selected_consultants"
        >
          <FormControl fullWidth>
            <InputLabel id="consultant-label">Consultants</InputLabel>
            <Select
              labelId="consultant-label"
              id="consultant-select"
              value={consultant}
              label="consultant"
              onChange={handleChangeConsultant}
            >
              <MenuItem value={10}>Consultant</MenuItem>
              <MenuItem value={20}>Mes Consultant</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="pageSuperAdmin-main_content">
        {activeSection !== null ? (
          <h2 className="pageSuperAdmin-main_title"> les {activeSection}</h2>
        ) : (
          ""
        )}

        {activeSection === "candidates" &&
          candidate === 10 &&
          allCandidates.map((oneCandidate) => (
            <Candidate key={oneCandidate.id} candidate={oneCandidate} />
          ))}
        {activeSection === "offres" &&
          allOffers.map((oneOffer) => (
            <Offer
              key={oneOffer.id}
              offer={oneOffer}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          ))}
        {activeSection === "enterprises" &&
          enterprise === 10 &&
          allEnterprises.map((oneEnterprise) => (
            <Enterprise key={oneEnterprise.id} enterprise={oneEnterprise} />
          ))}
        {activeSection === "consultants" &&
          consultant === 10 &&
          allConsultant.map((oneConsultant) => (
            <Consultant key={oneConsultant.id} consultant={oneConsultant} />
          ))}
      </div>
    </div>
  );
};

export default PageSuperAdmin;
