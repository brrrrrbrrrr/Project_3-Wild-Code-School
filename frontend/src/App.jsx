/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { Route, Routes } from "react-router-dom";
import UserProvider from "./contexts/UserContext";

import "./App.css";

import Home from "./pages/Home";
import NavBar from "./components/navBar/NavBar";
import NotFound from "./components/notfound/NotFound";
import Footer from "./components/footer/Footer";
import PageDetailsOffer from "./pages/PageDetailsOffer";
import PageLoginRegister from "./pages/PageLoginRegister";
import PageRegister from "./pages/PageRegister";
import PageOffersEmploi from "./pages/PageOffersEmploi";
import PageSuperAdmin from "./pages/PageSuperAdmin";
import Chatting from "./pages/Chatting";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offer" element={<PageOffersEmploi />} />
          <Route path="/propos" element={<NotFound />} />
          <Route path="/offers/:id" element={<PageDetailsOffer />} />
          <Route path="/connect" element={<PageLoginRegister />} />
          <Route path="/registration" element={<PageRegister />} />
          <Route path="/superadmin" element={<PageSuperAdmin />} />
          <Route path="/messages" element={<Chatting />} />
        </Routes>
        <Footer />
      </UserProvider>
    </div>
  );
}

export default App;
