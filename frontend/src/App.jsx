import UserProvider from "./contexts/UserRecruiterContext";

import "./App.css";
import RegisterCandidate from "./components/register/RegisterCandidate";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <RegisterCandidate />
      </UserProvider>
    </div>
  );
}

export default App;
