import UserProvider from "./contexts/UserRecruiterContext";

import "./App.css";

import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Home />
      </UserProvider>
    </div>
  );
}

export default App;
