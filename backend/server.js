
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");

require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

// Autoriser le frontend React à communiquer avec l'API
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Lire les requêtes JSON
app.use(express.json({ limit: "10kb" }));

// Routes de l'API
app.use("/api/artisans", require("./routes/artisanRoutes"));
app.use("/api/categories", require("./routes/categorieRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));

// Route d'accueil de l'API
app.get("/", (req, res) => {
  res.json({
    message: "API Trouve ton artisan opérationnelle.",
  });
});

// Route pour les adresses inconnues de l'API
app.use((req, res) => {
  res.status(404).json({
    message: "Route API introuvable.",
  });
});

// Démarrage du serveur après vérification de la base de données
async function demarrerServeur() {
  try {
    await sequelize.authenticate();

    console.log("Connexion à MySQL réussie.");

    app.listen(PORT, () => {
      console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Impossible de démarrer le serveur :", error.message);
    process.exit(1);
  }
}

demarrerServeur();
