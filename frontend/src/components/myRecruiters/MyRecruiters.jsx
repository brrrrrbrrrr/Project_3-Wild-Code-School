import React, { useEffect, useState } from "react";
import RecruiterInfos from "../recruiterInfos/RecruiterInfos";
import useApi from "../../services/useApi";

function MyRecruiters() {
  const api = useApi();
  const [dataRecruiters, setDatarecruiters] = useState([]);
  useEffect(() => {
    api.get("/recruiters").then((res) => {
      setDatarecruiters(res.data);
    });
  }, []);
  return (
    <div>
      {dataRecruiters.map((recruiter) => (
        <RecruiterInfos key={recruiter.id} recruiter={recruiter} />
      ))}
    </div>
  );
}

export default MyRecruiters;
