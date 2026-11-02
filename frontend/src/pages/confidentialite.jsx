import { Link } from "react-router-dom";

function Confidentialite() {
  return (
    <main className="container py-5">
      <div className="legal-page">
        <p className="eyebrow">Données personnelles</p>

        <h1>Politique de confidentialité</h1>

        <section>
          <h2>Collecte des données</h2>

          <p>
            Le formulaire de contact peut recueillir le nom, l'adresse
            e-mail et le message saisis par l'utilisateur afin de permettre
            l'envoi d'une demande à l'artisan sélectionné.
          </p>
        </section>

        <section>
          <h2>Utilisation des données</h2>

          <p>
            Les données saisies dans le formulaire sont utilisées uniquement
            pour transmettre le message à l'artisan concerné.
          </p>
        </section>

        <section>
          <h2>Conservation</h2>

          <p>
            Les données transmises par le formulaire n'ont pas vocation à être
            conservées dans la base de données du site.
          </p>
        </section>

        <section>
          <h2>Droits des utilisateurs</h2>

          <p>
            Conformément à la réglementation applicable, les utilisateurs
            peuvent exercer leurs droits concernant leurs données personnelles
            auprès du responsable du traitement.
          </p>
        </section>

        <section>
          <h2>Cookies</h2>

          <p>
            Le site n'utilise pas de cookies publicitaires ou de suivi
            comportemental dans le cadre de ce projet.
          </p>
        </section>

        <Link to="/" className="btn btn-primary mt-3">
          Retour à l'accueil
        </Link>
      </div>
    </main>
  );
}

export default Confidentialite;