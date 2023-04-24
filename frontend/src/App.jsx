import UserProvider from "./contexts/UserRecruiterContext";

import "./App.css";

import PageRegister from "./pages/PageRegister";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <PageRegister />
      </UserProvider>
    </div>
  );
}

export default App;
