
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

function Artisans() {
  const [searchParams] = useSearchParams()
  const categorie = searchParams.get('categorie') || ''

  const [artisans, setArtisans] = useState([])
  const [erreur, setErreur] = useState('')
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    setChargement(true)
    setErreur('')

    const url = categorie
      ? `http://localhost:3000/api/artisans?categorie=${encodeURIComponent(categorie)}`
      : 'http://localhost:3000/api/artisans'

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Impossible de charger les artisans.')
        }
        return response.json()
      })
      .then((data) => setArtisans(data))
      .catch(() => setErreur('Impossible de charger les artisans.'))
      .finally(() => setChargement(false))
  }, [categorie])

  return (
    <main className="content-section">
      <Link to="/">← Retour à l'accueil</Link>

      <p className="eyebrow">NOS PROFESSIONNELS</p>
      <h1>{categorie || 'Tous les artisans'}</h1>

      {chargement && <p>Chargement des artisans...</p>}
      {erreur && <p role="alert">{erreur}</p>}

      {!chargement && !erreur && artisans.length === 0 && (
        <p>Aucun artisan trouvé dans cette catégorie.</p>
      )}

      {!chargement && !erreur && artisans.length > 0 && (
        <div className="category-grid">
          {artisans.map((artisan) => (
            <article className="category-card" key={artisan.id}>
              <h2>
                <Link to={`/artisans/${artisan.id}`}>{artisan.nom}</Link>
                </h2>
              <p>{artisan.specialite?.nom ?? 'Spécialité non renseignée'}</p>
              <p>{artisan.ville}</p>
              <p>⭐ {artisan.note}/5</p>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}

export default Artisans
