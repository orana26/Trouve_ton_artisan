const Artisan = require("./artisan");
const Specialite = require("./specialite");
const Categorie = require("./categorie");

// Categorie -> Specialite
Categorie.hasMany(Specialite, {
    foreignKey: "categorie_id",
    as: "specialites",
});

Specialite.belongsTo(Categorie, {
    foreignKey: "categorie_id",
    as: "categorie",
});

// Specialite -> Artisan
Specialite.hasMany(Artisan, {
    foreignKey: "specialite_id",
    as: "artisans",
});

Artisan.belongsTo(Specialite, {
    foreignKey: "specialite_id",
    as: "specialite",
});

module.exports = {
    Artisan,
    Specialite,
    Categorie,
};