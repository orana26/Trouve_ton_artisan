
const express = require("express");
const nodemailer = require("nodemailer");
const { Artisan } = require("../models");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { artisanId, nom, email, message } = req.body;

    if (
      !Number.isInteger(Number(artisanId)) ||
      Number(artisanId) < 1 ||
      typeof nom !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !nom.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return res.status(400).json({
        message: "Merci de remplir correctement tous les champs.",
      });
    }

    if (
      nom.trim().length > 100 ||
      email.trim().length > 254 ||
      message.trim().length > 5000 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return res.status(400).json({
        message: "Les informations saisies sont invalides.",
      });
    }

    const artisan = await Artisan.findByPk(Number(artisanId));

    if (!artisan) {
      return res.status(404).json({
        message: "Cet artisan est introuvable.",
      });
    }

    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_PORT ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASSWORD ||
      !process.env.SMTP_FROM
    ) {
      return res.status(503).json({
        message:
          "Le service d'envoi des messages n'est pas encore configuré.",
      });
    }

    const transporteur = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporteur.sendMail({
      from: process.env.SMTP_FROM,
      to: artisan.email,
      replyTo: email.trim(),
      subject: `Nouveau message depuis Trouve ton artisan`,
      text: [
        `Message destiné à : ${artisan.nom}`,
        "",
        `Nom du contact : ${nom.trim()}`,
        `Adresse e-mail : ${email.trim()}`,
        "",
        "Message :",
        message.trim(),
      ].join("\n"),
    });

    return res.status(200).json({
      message: "Ton message a bien été envoyé à l'artisan.",
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi du contact :", error.message);

    return res.status(500).json({
      message: "Une erreur est survenue. Merci de réessayer plus tard.",
    });
  }
});

module.exports = router;
