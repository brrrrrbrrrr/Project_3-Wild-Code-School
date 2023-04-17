import UserProvider from "./contexts/UserRecruiterContext";

import "./App.css";

import Home from "./pages/Home";

import Register from "./components/register/Register";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Home />
        <Register />
      </UserProvider>
    </div>
  );
}

export default App;
