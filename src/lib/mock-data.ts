export const stats = {
  demandesJour: 27,
  devisPrep: 14,
  commandesEnCours: 38,
  produitsRupture: 6,
  reclamationsOuvertes: 4,
  chiffreAffaires: "1 284 500 €",
};

export const demandesParCategorie = [
  { categorie: "Acier", valeur: 42 },
  { categorie: "Inox", valeur: 28 },
  { categorie: "Tubes", valeur: 19 },
  { categorie: "Plastiques", valeur: 14 },
  { categorie: "Outillage", valeur: 22 },
];

export const activitesAgents = [
  { agent: "Technico-commercial", action: "Recommandation Hardox 450 envoyée à MetalCorp", time: "il y a 4 min" },
  { agent: "Devis", action: "Brouillon DEV-2026-142 généré", time: "il y a 12 min" },
  { agent: "Stocks", action: "Alerte rupture Inox 304 Ø20mm", time: "il y a 22 min" },
  { agent: "Service client", action: "Réponse WhatsApp à Atelier Dupont", time: "il y a 35 min" },
  { agent: "Prospection", action: "3 nouveaux prospects qualifiés", time: "il y a 1 h" },
  { agent: "Suivi commandes", action: "CMD-2026-018 passée en expédition", time: "il y a 2 h" },
];

export const demandes = [
  { id: "DEM-2026-091", client: "MetalCorp SAS", canal: "Email", produit: "Tôle Hardox 450 8mm", statut: "Nouveau", date: "24/07/2026" },
  { id: "DEM-2026-090", client: "Atelier Dupont", canal: "WhatsApp", produit: "Tube inox 304 Ø20", statut: "En analyse", date: "24/07/2026" },
  { id: "DEM-2026-089", client: "Industrie Rhône", canal: "Site web", produit: "Barre alu 6060", statut: "Traité", date: "23/07/2026" },
  { id: "DEM-2026-088", client: "Techno Plast", canal: "Email", produit: "Plaque POM 20mm", statut: "En analyse", date: "23/07/2026" },
  { id: "DEM-2026-087", client: "Constructions BTS", canal: "Téléphone", produit: "Outillage - Meuleuse pro", statut: "Traité", date: "22/07/2026" },
];

export const devis = [
  { id: "DEV-2026-142", client: "MetalCorp SAS", montant: "12 480 €", statut: "Brouillon", date: "24/07/2026" },
  { id: "DEV-2026-141", client: "Atelier Dupont", montant: "3 220 €", statut: "Envoyé", date: "24/07/2026" },
  { id: "DEV-2026-140", client: "Industrie Rhône", montant: "8 750 €", statut: "En relance", date: "22/07/2026" },
  { id: "DEV-2026-139", client: "Techno Plast", montant: "5 100 €", statut: "Accepté", date: "21/07/2026" },
  { id: "DEV-2026-138", client: "Constructions BTS", montant: "1 890 €", statut: "Refusé", date: "20/07/2026" },
];

export const commandes = [
  { id: "CMD-2026-020", client: "MetalCorp SAS", montant: "12 480 €", etape: "Préparation", retard: false },
  { id: "CMD-2026-019", client: "Atelier Dupont", montant: "3 220 €", etape: "Découpe", retard: false },
  { id: "CMD-2026-018", client: "Industrie Rhône", montant: "8 750 €", etape: "Expédition", retard: true },
  { id: "CMD-2026-017", client: "Techno Plast", montant: "5 100 €", etape: "Livraison", retard: false },
  { id: "CMD-2026-016", client: "Constructions BTS", montant: "1 890 €", etape: "Produits disponibles", retard: false },
];

export const etapesCommande = [
  "Commande validée",
  "Produits disponibles",
  "Préparation",
  "Découpe",
  "Expédition",
  "Livraison",
];

export const stocks = [
  { ref: "AC-S235-P10", designation: "Tôle S235 10mm 2000x1000", qte: 42, emplacement: "A1-03", seuil: 20, alt: "AC-S275-P10" },
  { ref: "IN-304-T20", designation: "Tube inox 304 Ø20 ép2", qte: 8, emplacement: "B2-11", seuil: 15, alt: "IN-316-T20" },
  { ref: "AL-6060-B30", designation: "Barre alu 6060 Ø30", qte: 120, emplacement: "C1-05", seuil: 40, alt: "AL-6082-B30" },
  { ref: "PL-POM-P20", designation: "Plaque POM 20mm", qte: 3, emplacement: "D3-02", seuil: 10, alt: "PL-PA6-P20" },
  { ref: "HX-450-P08", designation: "Tôle Hardox 450 8mm", qte: 15, emplacement: "A2-07", seuil: 12, alt: "HX-500-P08" },
];

export const fournisseurs = [
  { nom: "AcierPro SA", prix: "8 200 €", delai: "5 jours", paiement: "30j fin de mois" },
  { nom: "MétaFrance", prix: "8 450 €", delai: "3 jours", paiement: "45j" },
  { nom: "SteelDirect", prix: "7 980 €", delai: "8 jours", paiement: "Comptant" },
];

export const messagesClient = [
  { from: "client", canal: "WhatsApp", nom: "Jean Dupont", text: "Bonjour, avez-vous du tube inox 304 Ø20 en stock ?", time: "09:12" },
  { from: "agent", text: "Bonjour, oui nous avons 8 unités disponibles en A1-03. Souhaitez-vous un devis ?", time: "09:12" },
  { from: "client", canal: "WhatsApp", nom: "Jean Dupont", text: "Oui, pour 20 unités svp.", time: "09:13" },
  { from: "agent", text: "Devis DEV-2026-141 envoyé par email. Délai de livraison : 3 jours ouvrés.", time: "09:14" },
];

export const documents = [
  { nom: "Fiche technique Hardox 450", type: "Fiche technique", client: "MetalCorp", commande: "CMD-2026-020", statut: "OK" },
  { nom: "Certificat matière 3.1 - Inox 304", type: "Certificat", client: "Atelier Dupont", commande: "CMD-2026-019", statut: "OK" },
  { nom: "Bon de livraison", type: "BL", client: "Industrie Rhône", commande: "CMD-2026-018", statut: "Manquant" },
  { nom: "Rapport de contrôle", type: "Qualité", client: "Techno Plast", commande: "CMD-2026-017", statut: "Non conforme" },
];

export const prospects = [
  { entreprise: "Métallurgie Alpine", secteur: "Sous-traitance mécanique", contact: "M. Laurent", statut: "À contacter" },
  { entreprise: "Fabrik Industries", secteur: "Chaudronnerie", contact: "Mme Petit", statut: "Qualifié" },
  { entreprise: "ProCut Solutions", secteur: "Découpe laser", contact: "M. Bernard", statut: "Relance" },
  { entreprise: "InoxTech", secteur: "Agroalimentaire", contact: "Mme Rousseau", statut: "Opportunité" },
];

export const reclamations = [
  { id: "REC-2026-014", client: "Industrie Rhône", type: "Défaut matière", urgence: "Haute", statut: "En cours" },
  { id: "REC-2026-013", client: "MetalCorp", type: "Erreur dimension", urgence: "Moyenne", statut: "En cours" },
  { id: "REC-2026-012", client: "Techno Plast", type: "Retard livraison", urgence: "Basse", statut: "Résolu" },
  { id: "REC-2026-011", client: "Atelier Dupont", type: "Document manquant", urgence: "Moyenne", statut: "En cours" },
];

export const reporting = {
  devisEnvoyes: 128,
  tauxConversion: "34 %",
  chiffreAffaires: "1 284 500 €",
  commandesRetard: 5,
  ruptures: 6,
  reclamations: 4,
  topProduits: [
    { nom: "Tôle Hardox 450", qte: 82 },
    { nom: "Tube inox 304", qte: 64 },
    { nom: "Barre alu 6060", qte: 41 },
    { nom: "Plaque POM", qte: 28 },
  ],
  resume:
    "Cette semaine, priorité aux 3 devis > 10k€ en attente de relance (MetalCorp, Industrie Rhône, InoxTech). Deux ruptures critiques sur Inox 304 Ø20 et POM 20mm nécessitent un réapprovisionnement urgent. La commande CMD-2026-018 est en retard : notifier le client. Opportunité chaude à qualifier chez Fabrik Industries.",
};

export const agents = [
  { id: "technico", nom: "Agent technico-commercial", fonction: "Analyse besoin, recommandation produit", statut: "Actif" },
  { id: "devis", nom: "Agent de traitement des devis", fonction: "Extraction & génération de devis", statut: "Actif" },
  { id: "stocks", nom: "Agent de gestion des stocks", fonction: "Disponibilité, alertes, alternatives", statut: "Actif" },
  { id: "achats", nom: "Agent achats & approvisionnement", fonction: "Consultation fournisseurs", statut: "Actif" },
  { id: "sc", nom: "Agent service client omnicanal", fonction: "WhatsApp, email, site web", statut: "Actif" },
  { id: "doc", nom: "Agent documentaire & qualité", fonction: "Fiches, certificats, NC", statut: "Actif" },
  { id: "prospection", nom: "Agent de prospection B2B", fonction: "Prospects & opportunités", statut: "Actif" },
  { id: "suivi", nom: "Agent de suivi commandes & livraisons", fonction: "Étapes de production & expédition", statut: "Actif" },
  { id: "sav", nom: "Agent réclamations & SAV", fonction: "Tickets, urgence, solutions", statut: "Actif" },
  { id: "reporting", nom: "Agent reporting & pilotage", fonction: "KPI & synthèse hebdo", statut: "Actif" },
];
