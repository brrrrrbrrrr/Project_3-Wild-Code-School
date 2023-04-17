import Home from "./pages/Home";

import "./App.css";
import CandidateProvider from "./contexts/CandidateContext";

function App() {
  return (
    <div className="App">
      <CandidateProvider>
        <Home />
      </CandidateProvider>
    </div>
  );
}

export default App;
