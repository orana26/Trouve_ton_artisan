import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function App() {
  const [categories, setCategories] = useState([]);
  const [artisans, setArtisans] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [resultats, setResultats] = useState([]);
  const [erreur, setErreur] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function chargerDonnees() {
      try {
        const [categoriesResponse, artisansResponse] = await Promise.all([
          fetch("http://localhost:3000/api/categories"),
          fetch("http://localhost:3000/api/artisans/top"),
        ]);

        if (!categoriesResponse.ok || !artisansResponse.ok) {
          throw new Error("Impossible de charger les données.");
        }

        const categoriesData = await categoriesResponse.json();
        const artisansData = await artisansResponse.json();

        setCategories(categoriesData);
        setArtisans(artisansData);
      } catch (error) {
        console.error(error);
        setErreur("Impossible de charger les informations du site.");
      }
    }

    chargerDonnees();
  }, []);

  async function rechercher(event) {
    event.preventDefault();

    const terme = recherche.trim();

    if (!terme) {
      setResultats([]);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/artisans/recherche?nom=${encodeURIComponent(
          terme
        )}`
      );

      if (!response.ok) {
        throw new Error("Recherche impossible.");
      }

      const data = await response.json();
      setResultats(data);
    } catch (error) {
      console.error(error);
      setResultats([]);
    }
  }

  function voirCategorie(nomCategorie) {
    navigate(`/artisans?categorie=${encodeURIComponent(nomCategorie)}`);
  }

  return (
    <div className="site-page">
      <header className="site-header">
        <div className="container">
          <div className="header-main">
            <Link to="/" className="brand-link" aria-label="Accueil Trouve ton artisan">
              <img
                src="/Logo.png"
                alt="Trouve ton artisan ! Avec la région Auvergne-Rhône-Alpes"
                className="site-logo"
              />
            </Link>

            <nav className="main-navigation" aria-label="Navigation principale">
              <Link to="/">Accueil</Link>
              <Link to="/artisans">Tous les artisans</Link>
            </nav>
          </div>

          <nav className="category-navigation" aria-label="Catégories d'artisans">
            {categories.map((categorie) => (
              <button
                key={categorie.id}
                type="button"
                onClick={() => voirCategorie(categorie.nom)}
              >
                {categorie.nom}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <div className="hero-text">
                <p className="eyebrow">Artisanat en Auvergne-Rhône-Alpes</p>

                <h1>
                  Trouve ton
                  <span> artisan !</span>
                </h1>

                <p className="hero-description">
                  Découvre les artisans de la région et trouve le savoir-faire
                  dont tu as besoin près de chez toi.
                </p>
              </div>

              <div className="search-box">
                <h2>Que recherches-tu ?</h2>

                <form onSubmit={rechercher} className="search-form">
                  <label htmlFor="recherche-artisan" className="visually-hidden">
                    Rechercher un artisan
                  </label>

                  <input
                    id="recherche-artisan"
                    type="search"
                    value={recherche}
                    onChange={(event) => setRecherche(event.target.value)}
                    placeholder="Nom de l'artisan..."
                  />

                  <button type="submit" className="btn-primary-custom">
                    Rechercher
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {erreur && (
          <div className="container">
            <div className="alert alert-danger mt-4" role="alert">
              {erreur}
            </div>
          </div>
        )}

        {resultats.length > 0 && (
          <section className="search-results-section">
            <div className="container">
              <div className="section-heading">
                <p className="eyebrow">Résultats</p>
                <h2>Artisans trouvés</h2>
              </div>

              <div className="artisan-grid">
                {resultats.map((artisan) => (
                  <article className="artisan-card" key={artisan.id}>
                    <div className="artisan-card-content">
                      <span className="artisan-category">
                        {artisan.specialite?.categorie?.nom}
                      </span>

                      <h3>{artisan.nom}</h3>

                      <p className="artisan-specialty">
                        {artisan.specialite?.nom}
                      </p>

                      <p className="artisan-city">{artisan.ville}</p>

                      <div className="artisan-rating">
                        <span aria-hidden="true">★</span>
                        <span>{artisan.note}/5</span>
                      </div>

                      <Link
                        to={`/artisans/${artisan.id}`}
                        className="card-link"
                      >
                        Voir la fiche
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="categories-section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Nos catégories</p>
              <h2>Trouve ton artisan par métier</h2>
              <p>
                Explore les différentes catégories d'artisans présents dans la
                région Auvergne-Rhône-Alpes.
              </p>
            </div>

            <div className="category-grid">
              {categories.map((categorie) => (
                <article className="category-card" key={categorie.id}>
                  <div className="category-number">
                    {String(categorie.id).padStart(2, "0")}
                  </div>

                  <div>
                    <h3>{categorie.nom}</h3>

                    {categorie.specialites?.length > 0 && (
                      <p>
                        {categorie.specialites
                          .map((specialite) => specialite.nom)
                          .join(" · ")}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => voirCategorie(categorie.nom)}
                    className="category-button"
                  >
                    Voir les artisans
                    <span aria-hidden="true">→</span>
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="featured-section">
          <div className="container">
            <div className="section-heading section-heading-light">
              <p className="eyebrow">À découvrir</p>
              <h2>Les artisans à l'honneur</h2>
              <p>
                Une sélection d'artisans mis en avant pour découvrir leur
                savoir-faire.
              </p>
            </div>

            <div className="artisan-grid">
              {artisans.map((artisan) => (
                <article
                  className="artisan-card artisan-card-featured"
                  key={artisan.id}
                >
                  <div className="artisan-card-top">
                    <span className="featured-badge">À la une</span>
                    <span className="artisan-rating">
                      <span aria-hidden="true">★</span> {artisan.note}/5
                    </span>
                  </div>

                  <div className="artisan-card-content">
                    <span className="artisan-category">
                      {artisan.specialite?.categorie?.nom}
                    </span>

                    <h3>{artisan.nom}</h3>

                    <p className="artisan-specialty">
                      {artisan.specialite?.nom}
                    </p>

                    <p className="artisan-city">{artisan.ville}</p>

                    <Link
                      to={`/artisans/${artisan.id}`}
                      className="card-link"
                    >
                      Découvrir l'artisan
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="steps-section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Comment ça marche ?</p>
              <h2>4 étapes pour trouver ton artisan</h2>
            </div>

            <div className="steps-grid">
              <article className="step-card">
                <span>01</span>
                <h3>Choisis une catégorie</h3>
                <p>
                  Parcours les différentes catégories de métiers disponibles.
                </p>
              </article>

              <article className="step-card">
                <span>02</span>
                <h3>Trouve ton artisan</h3>
                <p>
                  Consulte la liste des professionnels correspondant à ta
                  recherche.
                </p>
              </article>

              <article className="step-card">
                <span>03</span>
                <h3>Découvre son savoir-faire</h3>
                <p>
                  Consulte sa fiche, sa spécialité, sa ville et ses
                  informations.
                </p>
              </article>

              <article className="step-card">
                <span>04</span>
                <h3>Contacte-le</h3>
                <p>
                  Envoie directement un message à l'artisan depuis sa fiche.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-content">
            <div>
              <img
                src="/Logo.png"
                alt=""
                className="footer-logo"
              />
              <p>
                Trouve ton artisan en Auvergne-Rhône-Alpes.
              </p>
            </div>

            <div className="footer-links">
              <h2>Navigation</h2>
              <Link to="/">Accueil</Link>
              <Link to="/artisans">Tous les artisans</Link>
            </div>

            <div className="footer-contact">
              <h2>Contact</h2>
              <p>
                Région Auvergne-Rhône-Alpes
                <br />
                Lyon
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 Trouve ton artisan</p>
            <p>Projet réalisé dans le cadre d'une formation.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;