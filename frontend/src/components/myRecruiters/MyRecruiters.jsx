import React, { useEffect, useState } from "react";

import RecruiterInfos from "../recruiterInfos/RecruiterInfos";
import useApi from "../../services/useApi";
import { useUser } from "../../contexts/UserContext";

function MyRecruiters() {
  const [refresh, setRefresh] = useState(false);
  const api = useApi();
  const { user } = useUser();
  const userId = user?.id;

  const [dataRecruiters, setDatarecruiters] = useState([]);
  useEffect(() => {
    api.get(`/compagny/${userId}/my-recruiters`).then((res) => {
      setDatarecruiters(res.data);
    });
  }, [refresh]);

  return (
    <div>
      {dataRecruiters.map((recruiter) => (
        <RecruiterInfos
          key={recruiter.id}
          recruiter={recruiter}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      ))}
    </div>
  );
}

export default MyRecruiters;
