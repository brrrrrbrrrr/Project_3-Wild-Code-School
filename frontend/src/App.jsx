import UserProvider from "./contexts/UserRecruiterContext";

import "./App.css";

import Register from "./components/register/Register";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Register />
      </UserProvider>
    </div>
  );
}

export default App;
