import { Link } from "react-router-dom";

function MentionsLegales() {
  return (
    <main className="container py-5">
      <div className="legal-page">
        <p className="eyebrow">Informations légales</p>

        <h1>Mentions légales</h1>

        <section>
          <h2>Éditeur du site</h2>

          <p>
            Le site « Trouve ton artisan ! » est réalisé dans le cadre d'un
            projet de formation.
          </p>

          <p>
            Région Auvergne-Rhône-Alpes
            <br />
            Lyon, France
          </p>
        </section>

        <section>
          <h2>Hébergement</h2>

          <p>
            Les informations relatives à l'hébergement seront complétées lors
            de la mise en ligne du projet.
          </p>
        </section>

        <section>
          <h2>Propriété intellectuelle</h2>

          <p>
            Les éléments graphiques et contenus présents sur ce site sont
            utilisés dans le cadre du projet « Trouve ton artisan ! ».
          </p>
        </section>

        <section>
          <h2>Responsabilité</h2>

          <p>
            Les informations concernant les artisans sont fournies à titre
            informatif. Elles peuvent être modifiées ou mises à jour.
          </p>
        </section>

        <Link to="/" className="btn btn-primary mt-3">
          Retour à l'accueil
        </Link>
      </div>
    </main>
  );
}

export default MentionsLegales;