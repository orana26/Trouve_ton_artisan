
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function DetailArtisan() {
  const { id } = useParams();

  const [artisan, setArtisan] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [retour, setRetour] = useState("");
  const [envoiReussi, setEnvoiReussi] = useState(false);

  useEffect(() => {
    async function chargerArtisan() {
      try {
        setChargement(true);
        setErreur("");

        const reponse = await fetch(
          `http://localhost:3000/api/artisans/${id}`
        );

        if (!reponse.ok) {
          throw new Error(
            reponse.status === 404
              ? "Cet artisan n'existe pas."
              : "Impossible de charger la fiche de l'artisan."
          );
        }

        const donnees = await reponse.json();
        setArtisan(donnees);
      } catch (error) {
        setErreur(error.message);
      } finally {
        setChargement(false);
      }
    }

    chargerArtisan();
  }, [id]);

  async function envoyerMessage(event) {
    event.preventDefault();
    setRetour("");
    setEnvoiReussi(false);
    setEnvoi(true);

    try {
      const reponse = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          artisanId: Number(id),
          nom,
          email,
          message,
        }),
      });

      const resultat = await reponse.json();

      if (!reponse.ok) {
        throw new Error(
          resultat.message || "Impossible d'envoyer le message."
        );
      }

      setRetour(resultat.message);
      setEnvoiReussi(true);
      setNom("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setRetour(error.message);
    } finally {
      setEnvoi(false);
    }
  }

  if (chargement) {
    return (
      <main className="container py-5">
        <p>Chargement de la fiche artisan...</p>
      </main>
    );
  }

  if (erreur || !artisan) {
    return (
      <main className="container py-5">
        <h1>Artisan introuvable</h1>
        <p>{erreur || "Cette fiche n'est pas disponible."}</p>
        <Link to="/artisans">Retour aux artisans</Link>
      </main>
    );
  }

  const specialite = artisan.specialite;
  const categorie = specialite?.categorie;

  return (
    <main className="container py-5">
      <p>
        <Link to="/">Accueil</Link>
        {" / "}
        <Link to="/artisans">Artisans</Link>
        {" / "}
        {artisan.nom}
      </p>

      <article className="artisan-detail">
        <p>
          {categorie?.nom || "Artisanat"}
          {specialite?.nom ? ` / ${specialite.nom}` : ""}
        </p>

        <h1>{artisan.nom}</h1>

        <p>
          <strong>Ville :</strong> {artisan.ville}
        </p>

        <p>
          <strong>Note :</strong> {artisan.note}/5
        </p>

        {artisan.image_url && (
          <img
            src={artisan.image_url}
            alt={`Présentation de ${artisan.nom}`}
            className="img-fluid rounded mb-4"
          />
        )}

        <section className="my-4">
          <h2>À propos</h2>
          <p>
            {artisan.a_propos ||
              "Les informations de présentation de cet artisan seront bientôt disponibles."}
          </p>
        </section>

        {artisan.site_web && (
          <p>
            <strong>Site internet :</strong>{" "}
            <a
              href={artisan.site_web}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visiter le site de l'artisan
            </a>
          </p>
        )}

        <section className="my-5" aria-labelledby="contact-titre">
          <h2 id="contact-titre">Contacter cet artisan</h2>
          <p>
            Remplis ce formulaire pour lui envoyer un message.
          </p>

          <form onSubmit={envoyerMessage}>
            <div className="mb-3">
              <label htmlFor="contact-nom" className="form-label">
                Ton nom
              </label>
              <input
                id="contact-nom"
                className="form-control"
                type="text"
                autoComplete="name"
                maxLength="100"
                value={nom}
                onChange={(event) => setNom(event.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="contact-email" className="form-label">
                Ton adresse e-mail
              </label>
              <input
                id="contact-email"
                className="form-control"
                type="email"
                autoComplete="email"
                maxLength="254"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="contact-message" className="form-label">
                Ton message
              </label>
              <textarea
                id="contact-message"
                className="form-control"
                rows="5"
                maxLength="5000"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
              />
            </div>

            {retour && (
              <p role="status" aria-live="polite">
                {retour}
              </p>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={envoi}
            >
              {envoi ? "Envoi en cours..." : "Envoyer mon message"}
            </button>
          </form>
        </section>
      </article>
    </main>
  );
}

export default DetailArtisan;
