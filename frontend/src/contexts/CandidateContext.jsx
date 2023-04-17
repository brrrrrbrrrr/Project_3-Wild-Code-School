/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import { createContext, useContext, useState } from "react";

const CandidateContext = createContext(null);

const CandidateProvider = ({ children }) => {
  const [candidate, setCandidate] = useState(null);
  return (
    <CandidateContext.Provider value={{ candidate, setCandidate }}>
      {children}
    </CandidateContext.Provider>
  );
};

export const useCandidate = () => useContext(CandidateContext);

export default CandidateProvider;
