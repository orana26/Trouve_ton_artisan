import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";

import App from "./App.jsx";
import Artisans from "./pages/artisans.jsx";
import DetailArtisan from "./pages/detailArtisan.jsx";
import MentionsLegales from "./pages/mentionslegales.jsx";
import Confidentialite from "./pages/confidentialite.jsx";

function Page404() {
  return (
    <main className="container py-5 text-center">
      <h1>Page introuvable</h1>
      <p>La page demandée n'existe pas.</p>
      <a href="/" className="btn btn-primary">
        Retour à l'accueil
      </a>
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/artisans" element={<Artisans />} />

        <Route path="/artisans/:id" element={<DetailArtisan />} />

        <Route
          path="/mentions-legales"
          element={<MentionsLegales />}
        />

        <Route
          path="/politique-confidentialite"
          element={<Confidentialite />}
        />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);