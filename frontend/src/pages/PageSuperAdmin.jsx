/* eslint-disable react/function-component-definition */

import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
  const [refresh, setRefresh] = useState(false);

  const api = useApi();

  const handleChangeCandidate = (event) => {
    setCandidate(event.target.value);
    setOffer("");
    setEnterprise("");
    setConsultant("");
    setActiveSection("candidats.es");
    setRecruiter("");
  };

  const handleChangeRecruiter = (event) => {
    setRecruiter(event.target.value);
    setCandidate("");
    setEnterprise("");
    setConsultant("");
    setOffer("");
    setActiveSection("recruteurs.euses");
  };

  const handleChangeOffer = (event) => {
    setOffer(event.target.value);
    setCandidate("");
    setEnterprise("");
    setConsultant("");
    setRecruiter("");
    setActiveSection("offres");
  };

  const handleChangeEnterprise = (event) => {
    setEnterprise(event.target.value);
    setCandidate("");
    setOffer("");
    setConsultant("");
    setRecruiter("");
    setActiveSection("entreprises");
  };
  const handleChangeConsultant = (event) => {
    setConsultant(event.target.value);
    setCandidate("");
    setOffer("");
    setEnterprise("");
    setRecruiter("");
    setActiveSection("consultants.es");
  };

  useEffect(() => {
    if (candidate === 10) {
      api
        .get("/admin/offer-status/")
        .then((response) => {
          setAllCandidates(response.data);
        })
        .catch(() => {
          toast.error("Une erreur s'est produite", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    }
  }, [candidate, refresh]);

  useEffect(() => {
    if (candidate === 20) {
      api
        .get("/admin/offer-status/2")
        .then((response) => {
          setAllCandidates(response.data);
        })

        .catch(() => {
          toast.error("Une erreur s'est produite", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    }
  }, [candidate, refresh]);

  useEffect(() => {
    if (candidate === 30) {
      api
        .get("/admin/offer-status/1")
        .then((response) => {
          setAllCandidates(response.data);
        })

        .catch(() => {
          toast.error("Une erreur s'est produite", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
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
        .catch(() => {
          toast.error("Une erreur s'est produite", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    }
  }, [recruiter, refresh]);

  useEffect(() => {
    if (offer === 10) {
      api
        .get("/offers/findall")
        .then((response) => {
          setAllOffers(response.data);
        })
        .catch(() => {
          toast.error("Une erreur s'est produite", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
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
        .catch(() => {
          toast.error("Une erreur s'est produite", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
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
        .catch(() => {
          toast.error("Une erreur s'est produite", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
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
        .catch(() => {
          toast.error("Une erreur s'est produite", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    } else if (enterprise === 20) {
      api
        .get("/compagny/valid", {
          params: {
            valid: 1,
          },
        })
        .then((response) => {
          setAllEnterprises(response.data);
        })
        .catch(() => {
          toast.error("Une erreur s'est produite", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    } else if (enterprise === 30) {
      api
        .get("/compagny/valid", {
          params: {
            valid: 0,
          },
        })
        .then((response) => {
          setAllEnterprises(response.data);
        })
        .catch(() => {
          toast.error("Une erreur s'est produite", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    }
  }, [enterprise, refresh]);

  useEffect(() => {
    if (consultant === 10) {
      api
        .get("/consultants")
        .then((response) => {
          setAllConsultant(response.data);
        })
        .catch(() => {
          toast.error("Une erreur s'est produite", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    }
  }, [consultant, refresh]);

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
              <MenuItem value={10}>Candidats.es</MenuItem>
              <MenuItem value={20}>Mes candidats.es</MenuItem>
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
              <MenuItem value={10}>Recruteurs.euses</MenuItem>
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
              <MenuItem value={10}>Toutes les offres</MenuItem>
              <MenuItem value={20}>Offres validées</MenuItem>
              <MenuItem value={30}>Offres en attente</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ width: 200 }} className="pageSuperAdmin-selected_enterprise">
          <FormControl fullWidth>
            <InputLabel id="enterprise-label">Entreprises</InputLabel>
            <Select
              labelId="enterprise-label"
              id="enterprise-select"
              value={enterprise}
              label="enterprise"
              onChange={handleChangeEnterprise}
            >
              <MenuItem value={10}>Toutes les entreprises</MenuItem>
              <MenuItem value={20}>Entreprises validées</MenuItem>
              <MenuItem value={30}>Entreprises en attente</MenuItem>
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
              <MenuItem value={10}>Consultants.es</MenuItem>
              <MenuItem value={20}>Mes consultants.es</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="pageSuperAdmin-main_content">
        {activeSection !== null ? (
          <h2 className="pageSuperAdmin-main_title"> Les {activeSection}</h2>
        ) : (
          ""
        )}

        {activeSection === "candidats.es" &&
          candidate === 10 &&
          allCandidates.map((oneCandidate) => (
            <Candidate
              key={`${oneCandidate.id}_${oneCandidate.offer_statusId}`}
              candidate={oneCandidate}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          ))}
        {activeSection === "candidats.es" &&
          candidate === 20 &&
          allCandidates.map((oneCandidate) => (
            <Candidate
              key={oneCandidate.candidateId}
              candidate={oneCandidate}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          ))}
        {activeSection === "candidats.es" &&
          candidate === 30 &&
          allCandidates.map((oneCandidate) => (
            <Candidate
              key={oneCandidate.candidateId}
              candidate={oneCandidate}
              refresh={refresh}
              setRefresh={setRefresh}
            />
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
        {activeSection === "entreprises" &&
          allEnterprises.map((oneEnterprise) => (
            <Enterprise
              key={oneEnterprise.id}
              enterprise={oneEnterprise}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          ))}
        {activeSection === "consultants.es" &&
          consultant === 10 &&
          allConsultant.map((oneConsultant) => (
            <Consultant
              key={oneConsultant.id}
              consultant={oneConsultant}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          ))}
        {activeSection === "recruteurs.euses" &&
          recruiter === 10 &&
          allRecruiters.map((oneRecruiter) => (
            <RecruiterInfos
              key={oneRecruiter.id}
              recruiter={oneRecruiter}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          ))}
      </div>
    </div>
  );
};

export default PageSuperAdmin;
