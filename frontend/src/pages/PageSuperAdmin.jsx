/* eslint-disable react/function-component-definition */

import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import { useEffect, useState } from "react";
import Candidate from "../components/superAdmin/candidate/Candidate";
import Offer from "../components/superAdmin/offer/Offer";
import Enterprise from "../components/superAdmin/enterprise/Enterpise";
import Consultant from "../components/superAdmin/consultant/Consultant";
import useApi from "../services/useApi";
import { useUser } from "../contexts/UserContext";
import RecruiterInfos from "../components/recruiterInfos/RecruiterInfos";

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
  const [recruiter, setRecruiter] = useState("");
  const [consultant, setConsultant] = useState("");
  const [allCandidates, setAllCandidates] = useState([]);
  const [allOffers, setAllOffers] = useState([]);
  const [allRecruiters, setAllrecruiters] = useState([]);
  const [allEnterprises, setAllEnterprises] = useState([]);
  const [allConsultant, setAllConsultant] = useState([]);
  const [activeSection, setActiveSection] = useState(null);

  const api = useApi();

  const handleChangeCandidate = (event) => {
    setCandidate(event.target.value);
    setOffer("");
    setEnterprise("");
    setConsultant("");
    setActiveSection("candidates");
    setRecruiter("");
  };

  const handleChangeRecruiter = (event) => {
    setRecruiter(event.target.value);
    setCandidate("");
    setEnterprise("");
    setConsultant("");
    setOffer("");
    setActiveSection("recruiters");
  };

  const handleChangeOffer = (event) => {
    setOffer(event.target.value);
    setCandidate("");
    setEnterprise("");
    setConsultant("");
    setActiveSection("offers");
  };

  const handleChangeEnterprise = (event) => {
    setEnterprise(event.target.value);
    setCandidate("");
    setOffer("");
    setConsultant("");
    setRecruiter("");
    setActiveSection("enterprises");
  };
  const handleChangeConsultant = (event) => {
    setConsultant(event.target.value);
    setCandidate("");
    setOffer("");
    setEnterprise("");
    setRecruiter("");
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
    if (recruiter === 10) {
      api
        .get("/recruiters")
        .then((response) => {
          setAllrecruiters(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [recruiter]);

  useEffect(() => {
    if (offer === 10) {
      api
        .get("/offers")
        .then((response) => {
          setAllOffers(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [offer]);
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
        <Box sx={{ width: 200 }} className="pageSuperAdmin-selected_recruiter">
          <FormControl fullWidth>
            <InputLabel id="recruiter-label">Recruteurs</InputLabel>
            <Select
              labelId="recruiter-label"
              id="recruiter-select"
              value={recruiter}
              label="Recruiter"
              onChange={handleChangeRecruiter}
            >
              <MenuItem value={10}>Recruteur</MenuItem>
              <MenuItem value={20}>Mes Recruteur</MenuItem>
              <MenuItem value={30}>En attentte</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ width: 200 }} className="pageSuperAdmin-selected_recruiter">
          <FormControl fullWidth>
            <InputLabel id="offer-label">Offres</InputLabel>
            <Select
              labelId="offer-label"
              id="offer-select"
              value={offer}
              label="Offer"
              onChange={handleChangeOffer}
            >
              <MenuItem value={10}>Offres</MenuItem>
              <MenuItem value={20}>Mes Offres</MenuItem>
              <MenuItem value={30}>En attentte</MenuItem>
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
        {activeSection === "offers" &&
          offer === 10 &&
          allOffers.map((oneOffer) => (
            <Offer key={oneOffer.id} offer={oneOffer} />
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
        {activeSection === "recruiters" &&
          recruiter === 10 &&
          allRecruiters.map((oneRecruiter) => (
            <RecruiterInfos key={oneRecruiter.id} recruiter={oneRecruiter} />
          ))}
      </div>
    </div>
  );
};

export default PageSuperAdmin;
