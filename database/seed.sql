-- Données de la base trouve_ton_artisan

-- =========================
-- CATÉGORIES
-- =========================

INSERT INTO categorie (nom) VALUES
('Alimentation'),
('Bâtiment'),
('Fabrication'),
('Services');


-- =========================
-- SPÉCIALITÉS
-- =========================

INSERT INTO specialite (nom, categorie_id) VALUES
('Boucher', (SELECT id FROM categorie WHERE nom = 'Alimentation')),
('Boulanger', (SELECT id FROM categorie WHERE nom = 'Alimentation')),
('Chocolatier', (SELECT id FROM categorie WHERE nom = 'Alimentation')),
('Traiteur', (SELECT id FROM categorie WHERE nom = 'Alimentation')),

('Chauffagiste', (SELECT id FROM categorie WHERE nom = 'Bâtiment')),
('Electricien', (SELECT id FROM categorie WHERE nom = 'Bâtiment')),
('Menuisier', (SELECT id FROM categorie WHERE nom = 'Bâtiment')),
('Plombier', (SELECT id FROM categorie WHERE nom = 'Bâtiment')),

('Bijoutier', (SELECT id FROM categorie WHERE nom = 'Fabrication')),
('Couturier', (SELECT id FROM categorie WHERE nom = 'Fabrication')),
('Ferronier', (SELECT id FROM categorie WHERE nom = 'Fabrication')),

('Coiffeur', (SELECT id FROM categorie WHERE nom = 'Services')),
('Fleuriste', (SELECT id FROM categorie WHERE nom = 'Services')),
('Toiletteur', (SELECT id FROM categorie WHERE nom = 'Services')),
('Webdesign', (SELECT id FROM categorie WHERE nom = 'Services'));


-- =========================
-- ARTISANS
-- =========================

INSERT INTO artisan
(nom, note, ville, a_propos, email, site_web, image_url, top, specialite_id)
VALUES

(
    'Boucherie Dumont',
    4.5,
    'Lyon',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'boucherie.dumond@gmail.com',
    NULL,
    NULL,
    FALSE,
    (SELECT id FROM specialite WHERE nom = 'Boucher')
),

(
    'Au pain chaud',
    4.8,
    'Montélimar',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'aupainchaud@hotmail.com',
    NULL,
    NULL,
    TRUE,
    (SELECT id FROM specialite WHERE nom = 'Boulanger')
),

(
    'Chocolaterie Labbé',
    4.9,
    'Lyon',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'chocolaterie-labbe@gmail.com',
    'https://chocolaterie-labbe.fr',
    NULL,
    TRUE,
    (SELECT id FROM specialite WHERE nom = 'Chocolatier')
),

(
    'Traiteur Truchon',
    4.1,
    'Lyon',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'contact@truchon-traiteur.fr',
    'https://truchon-traiteur.fr',
    NULL,
    FALSE,
    (SELECT id FROM specialite WHERE nom = 'Traiteur')
),

(
    'Orville Salmons',
    5.0,
    'Evian',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'o-salmons@live.com',
    NULL,
    NULL,
    TRUE,
    (SELECT id FROM specialite WHERE nom = 'Chauffagiste')
),

(
    'Mont Blanc Eléctricité',
    4.5,
    'Chamonix',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'contact@mont-blanc-electricite.com',
    'https://mont-blanc-electricite.com',
    NULL,
    FALSE,
    (SELECT id FROM specialite WHERE nom = 'Electricien')
),

(
    'Boutot & fils',
    4.7,
    'Bourg-en-bresse',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'boutot-menuiserie@gmail.com',
    'https://boutot-menuiserie.com',
    NULL,
    FALSE,
    (SELECT id FROM specialite WHERE nom = 'Menuisier')
),

(
    'Vallis Bellemare',
    4.0,
    'Vienne',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'v.bellemare@gmail.com',
    'https://plomberie-bellemare.com',
    NULL,
    FALSE,
    (SELECT id FROM specialite WHERE nom = 'Plombier')
),

(
    'Claude Quinn',
    4.2,
    'Aix-les-bains',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'claude.quinn@gmail.com',
    NULL,
    NULL,
    FALSE,
    (SELECT id FROM specialite WHERE nom = 'Bijoutier')
),

(
    'Amitee Lécuyer',
    4.5,
    'Annecy',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'a.amitee@hotmail.com',
    'https://lecuyer-couture.com',
    NULL,
    FALSE,
    (SELECT id FROM specialite WHERE nom = 'Couturier')
),

(
    'Ernest Carignan',
    5.0,
    'Le Puy-en-Velay',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'e-carigan@hotmail.com',
    NULL,
    NULL,
    FALSE,
    (SELECT id FROM specialite WHERE nom = 'Ferronier')
),

(
    'Royden Charbonneau',
    3.8,
    'Saint-Priest',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'r.charbonneau@gmail.com',
    NULL,
    NULL,
    FALSE,
    (SELECT id FROM specialite WHERE nom = 'Coiffeur')
),

(
    'Leala Dennis',
    3.8,
    'Chambéry',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'l.dennos@hotmail.fr',
    'https://coiffure-leala-chambery.fr',
    NULL,
    FALSE,
    (SELECT id FROM specialite WHERE nom = 'Coiffeur')
),

(
    'C''est sup''hair',
    4.1,
    'Romans-sur-Isère',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'sup-hair@gmail.com',
    'https://sup-hair.fr',
    NULL,
    FALSE,
    (SELECT id FROM specialite WHERE nom = 'Coiffeur')
),

(
    'Le monde des fleurs',
    4.6,
    'Annonay',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'contact@le-monde-des-fleurs-annonay.fr',
    'https://le-monde-des-fleurs-annonay.fr',
    NULL,
    FALSE,
    (SELECT id FROM specialite WHERE nom = 'Fleuriste')
),

(
    'Valérie Laderoute',
    4.5,
    'Valence',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'v-laredoute@gmail.com',
    NULL,
    NULL,
    FALSE,
    (SELECT id FROM specialite WHERE nom = 'Toiletteur')
),

(
    'CM Graphisme',
    4.4,
    'Valence',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'contact@cm-graphisme.com',
    'https://cm-graphisme.com',
    NULL,
    FALSE,
    (SELECT id FROM specialite WHERE nom = 'Webdesign')
);