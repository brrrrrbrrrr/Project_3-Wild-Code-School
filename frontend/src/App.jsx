import UserProvider from "./contexts/UserRecruiterContext";

import "./App.css";
import RegisterCandidate from "./components/register/RegisterCandidate";
import RegisterCompagny from "./components/register/RegisterCompagny";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <RegisterCandidate />
        <RegisterCompagny />
      </UserProvider>
    </div>
  );
}

export default App;
