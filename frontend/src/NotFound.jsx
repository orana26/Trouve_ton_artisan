import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="container py-5">
      <section className="not-found text-center">
        <p className="not-found-code">404</p>

        <h1>Page introuvable</h1>

        <p>
          Désolé, la page que tu recherches n'existe pas ou n'est plus
          disponible.
        </p>

        <Link to="/" className="btn btn-primary">
          Retour à l'accueil
        </Link>
      </section>
    </main>
  );
}

export default NotFound;