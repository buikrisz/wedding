import React from "react";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import { Home, Photos, Program, Rsvp } from "./pages";
import { Layout } from "./components";

const App = () => {
  const { pathname } = useLocation();
  const isRSVPPage = pathname === "/rsvp";

  return (
    <>
      {isRSVPPage ? (
        <Routes>
          <Route path="/rsvp" element={<Rsvp />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fotok" element={<Photos />} />
            <Route path="/program" element={<Program />} />
            <Route path="/rsvp" element={<Rsvp />} />
          </Routes>
        </Layout>
      )}
    </>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
