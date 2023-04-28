/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { Route, Routes } from "react-router-dom";
import UserProvider from "./contexts/UserRecruiterContext";

import "./App.css";

import Home from "./pages/Home";
import NavBar from "./components/navBar/NavBar";
import NotFound from "./components/notfound/NotFound";
import Footer from "./components/footer/Footer";
import PageDetailsOffer from "./pages/PageDetailsOffer";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offer" element={<NotFound />} />
          <Route path="/propos" element={<NotFound />} />
          <Route path="/connect" element={<NotFound />} />
          <Route path="/offers/:id" element={<PageDetailsOffer />} />
        </Routes>
        <Footer />
      </UserProvider>
    </div>
  );
}

export default App;
