
-- Base de données : trouve_ton_artisan
-- Création des tables principales

CREATE TABLE IF NOT EXISTS categorie (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS specialite (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE,
    categorie_id INT UNSIGNED NOT NULL,

    CONSTRAINT fk_specialite_categorie
        FOREIGN KEY (categorie_id)
        REFERENCES categorie(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS artisan (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(150) NOT NULL,
    note DECIMAL(2,1) NOT NULL,
    ville VARCHAR(100) NOT NULL,
    a_propos TEXT NOT NULL,
    email VARCHAR(254) NOT NULL,
    site_web VARCHAR(2048) NULL,
    image_url VARCHAR(2048) NULL,
    top BOOLEAN NOT NULL DEFAULT FALSE,
    specialite_id INT UNSIGNED NOT NULL,

    CONSTRAINT chk_artisan_note
        CHECK (note >= 0 AND note <= 5),

    CONSTRAINT fk_artisan_specialite
        FOREIGN KEY (specialite_id)
        REFERENCES specialite(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    INDEX idx_artisan_nom (nom),
    INDEX idx_artisan_specialite (specialite_id),
    INDEX idx_artisan_top (top)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;
