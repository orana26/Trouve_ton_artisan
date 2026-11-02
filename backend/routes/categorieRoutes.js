const express = require("express");
const router = express.Router();

const { Categorie, Specialite } = require("../models");

router.get("/", async (req, res) => {
    try {
        const categories = await Categorie.findAll({
            include: [
                {
                    model: Specialite,
                    as: "specialites",
                    attributes: ["id", "nom"],
                },
            ],
            order: [["nom", "ASC"]],
        });

        res.json(categories);
    } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error.message);

        res.status(500).json({
            message: "Erreur serveur lors de la récupération des catégories.",
        });
    }
});

module.exports = router;