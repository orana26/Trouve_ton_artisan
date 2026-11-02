const express = require("express");
const router = express.Router();

const { Artisan, Specialite, Categorie } = require("../models");

// Rechercher des artisans par nom
router.get("/recherche", async (req, res) => {
    try {
        const { Op } = require("sequelize");
        const { nom } = req.query;

        if (!nom || !nom.trim()) {
            return res.status(400).json({
                message: "Veuillez saisir un nom d'artisan."
            });
        }

        const artisans = await Artisan.findAll({
            where: {
                nom: {
                    [Op.like]: `%${nom.trim()}%`
                }
            },
            include: [
                {
                    model: Specialite,
                    as: "specialite",
                    attributes: ["id", "nom"],
                    include: [
                        {
                            model: Categorie,
                            as: "categorie",
                            attributes: ["id", "nom"]
                        }
                    ]
                }
            ]
        });

        res.json(artisans);
    } catch (error) {
        console.error("Erreur lors de la recherche :", error.message);

        res.status(500).json({
            message: "Erreur serveur lors de la recherche."
        });
    }
});

// Récupérer les artisans du mois
router.get("/top", async (req, res) => {
    try {
        const artisans = await Artisan.findAll({
            where: {
                top: true
            },
            include: [
                {
                    model: Specialite,
                    as: "specialite",
                    attributes: ["id", "nom"],
                    include: [
                        {
                            model: Categorie,
                            as: "categorie",
                            attributes: ["id", "nom"]
                        }
                    ]
                }
            ]
        });

        res.json(artisans);
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des artisans du mois :",
            error.message
        );

        res.status(500).json({
            message: "Erreur serveur lors de la récupération des artisans du mois."
        });
    }
});
// Récupérer un artisan par son identifiant
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!/^\d+$/.test(id)) {
            return res.status(400).json({
                message: "L'identifiant doit être un nombre."
            });
        }

        const artisan = await Artisan.findByPk(id, {
            include: [
                {
                    model: Specialite,
                    as: "specialite",
                    attributes: ["id", "nom"],
                    include: [
                        {
                            model: Categorie,
                            as: "categorie",
                            attributes: ["id", "nom"]
                        }
                    ]
                }
            ]
        });

        if (!artisan) {
            return res.status(404).json({
                message: "Artisan introuvable."
            });
        }

        res.json(artisan);
    } catch (error) {
        console.error(
            "Erreur lors de la récupération de l'artisan :",
            error.message
        );

        res.status(500).json({
            message: "Erreur serveur lors de la récupération de l'artisan."
        });
    }
});
// Récupérer les artisans
// Possibilité de filtrer par catégorie
router.get("/", async (req, res) => {
    try {
        const { categorie } = req.query;

        const whereArtisan = {};

        if (categorie && categorie.trim()) {
            whereArtisan["$specialite.categorie.nom$"] = categorie.trim();
        }

        const artisans = await Artisan.findAll({
            where: whereArtisan,

            include: [
                {
                    model: Specialite,
                    as: "specialite",
                    required: true,
                    attributes: ["id", "nom"],

                    include: [
                        {
                            model: Categorie,
                            as: "categorie",
                            required: true,
                            attributes: ["id", "nom"]
                        }
                    ]
                }
            ]
        });

        res.json(artisans);

    } catch (error) {
        console.error(
            "Erreur lors de la récupération des artisans :",
            error.message
        );

        res.status(500).json({
            message: "Erreur serveur lors de la récupération des artisans."
        });
    }
});


module.exports = router;