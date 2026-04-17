export interface Paroisse {
  id: string;
  name: string;
  city: string;
  district?: string;
  image: string;
  slug: string;
  lat: number;
  lng: number;
  distance?: number;
}

export interface Programme {
  id: string;
  title: string;
  type: 'messe' | 'evenement' | 'annonce';
  paroisseId: string;
  paroisseName: string;
  date: string;
  time: string;
  description: string;
}

const [currentPage, setCurrentPage] = useState(1);
const ITEMS_PER_PAGE = 12;

const MOCK_PAROISSES: Paroisse[] = [
  // ── COCODY (Archidiocèse d'Abidjan) ──────────────────────────────────────
  {
    id: '1',
    name: 'Saint Jean de Cocody',
    city: 'Abidjan',
    district: 'Cocody',
    image: 'https://picsum.photos/seed/saintjean/800/600',
    slug: 'saint-jean-cocody',
    lat: 5.3600,
    lng: -3.9980,
  },
  {
    id: '2',
    name: 'Saint Albert le Grand (CCEA)',
    city: 'Abidjan',
    district: 'Cocody',
    image: 'https://picsum.photos/seed/albertgrand/800/600',
    slug: 'saint-albert-grand-ccea',
    lat: 5.3480,
    lng: -4.0050,
  },
  {
    id: '3',
    name: 'Saint Jacques des Deux Plateaux',
    city: 'Abidjan',
    district: 'Cocody',
    image: 'https://picsum.photos/seed/saintjacques/800/600',
    slug: 'saint-jacques-deux-plateaux',
    lat: 5.3750,
    lng: -3.9850,
  },
  {
    id: '4',
    name: 'Sainte Cécile des Vallons',
    city: 'Abidjan',
    district: 'Cocody',
    image: 'https://picsum.photos/seed/saintececile/800/600',
    slug: 'sainte-cecile-vallons',
    lat: 5.3820,
    lng: -3.9780,
  },
  {
    id: '5',
    name: 'Sainte Famille de la Riviera',
    city: 'Abidjan',
    district: 'Cocody',
    image: 'https://picsum.photos/seed/saintefamille/800/600',
    slug: 'sainte-famille-riviera',
    lat: 5.3640,
    lng: -3.9680,
  },
  {
    id: '6',
    name: 'Saint Ambroise du Jubilé (Angré)',
    city: 'Abidjan',
    district: 'Cocody',
    image: 'https://picsum.photos/seed/ambroisejubile/800/600',
    slug: 'saint-ambroise-jubile-angre',
    lat: 5.3900,
    lng: -3.9950,
  },
  {
    id: '7',
    name: "Sainte Joséphine Bakhita (Deux Plateaux)",
    city: 'Abidjan',
    district: 'Cocody',
    image: 'https://picsum.photos/seed/bakhita/800/600',
    slug: 'sainte-josephine-bakhita',
    lat: 5.3700,
    lng: -3.9900,
  },

  // ── YOPOUGON (Diocèse de Yopougon) ───────────────────────────────────────
  {
    id: '8',
    name: 'Cathédrale Saint André (SICOGI)',
    city: 'Abidjan',
    district: 'Yopougon',
    image: 'https://picsum.photos/seed/saintandre/800/600',
    slug: 'cathedrale-saint-andre-yopougon',
    lat: 5.3381,
    lng: -4.0700,
  },
  {
    id: '9',
    name: 'Saint Marc (Toits Rouges)',
    city: 'Abidjan',
    district: 'Yopougon',
    image: 'https://picsum.photos/seed/saintmarc/800/600',
    slug: 'saint-marc-toits-rouges',
    lat: 5.3300,
    lng: -4.0620,
  },
  {
    id: '10',
    name: 'Saint Pierre de Niangon Sud',
    city: 'Abidjan',
    district: 'Yopougon',
    image: 'https://picsum.photos/seed/saintpierre/800/600',
    slug: 'saint-pierre-niangon-sud',
    lat: 5.3450,
    lng: -4.0800,
  },
  {
    id: '11',
    name: 'Saint Matthieu (Cité Verte)',
    city: 'Abidjan',
    district: 'Yopougon',
    image: 'https://picsum.photos/seed/saintmatthieu/800/600',
    slug: 'saint-matthieu-cite-verte',
    lat: 5.3550,
    lng: -4.0900,
  },
  {
    id: '12',
    name: 'Sainte Rita (Niangon Nord)',
    city: 'Abidjan',
    district: 'Yopougon',
    image: 'https://picsum.photos/seed/saintrita/800/600',
    slug: 'sainte-rita-niangon-nord',
    lat: 5.3520,
    lng: -4.0750,
  },
  {
    id: '13',
    name: 'Saint Laurent (Kouté)',
    city: 'Abidjan',
    district: 'Yopougon',
    image: 'https://picsum.photos/seed/saintlaurent/800/600',
    slug: 'saint-laurent-koute',
    lat: 5.3200,
    lng: -4.0950,
  },
  {
    id: '14',
    name: 'Sainte Trinité (Béago)',
    city: 'Abidjan',
    district: 'Yopougon',
    image: 'https://picsum.photos/seed/sainteterinite/800/600',
    slug: 'sainte-trinite-beago',
    lat: 5.3150,
    lng: -4.0850,
  },
  {
    id: '15',
    name: 'Saint Matthias (Yopougon Attié)',
    city: 'Abidjan',
    district: 'Yopougon',
    image: 'https://picsum.photos/seed/saintmatthias/800/600',
    slug: 'saint-matthias-yopougon-attie',
    lat: 5.3600,
    lng: -4.1000,
  },
  {
    id: '16',
    name: 'Sainte Joséphine Bakhita (Attécoubé III)',
    city: 'Abidjan',
    district: 'Yopougon',
    image: 'https://picsum.photos/seed/bakhitayop/800/600',
    slug: 'sainte-josephine-bakhita-attecoube-iii',
    lat: 5.3350,
    lng: -4.0550,
  },

  // ── ADJAMÉ (Archidiocèse d'Abidjan) ──────────────────────────────────────
  {
    id: '17',
    name: 'Saint Michel (Adjamé)',
    city: 'Abidjan',
    district: 'Adjamé',
    image: 'https://picsum.photos/seed/saintmichel/800/600',
    slug: 'saint-michel-adjame',
    lat: 5.3618,
    lng: -4.0195,
  },
  {
    id: '18',
    name: 'Saint Charles Lwanga (Adjamé)',
    city: 'Abidjan',
    district: 'Adjamé',
    image: 'https://picsum.photos/seed/charleslwanga/800/600',
    slug: 'saint-charles-lwanga-adjame',
    lat: 5.3650,
    lng: -4.0230,
  },
  {
    id: '19',
    name: 'Saint Luc (220 Logements)',
    city: 'Abidjan',
    district: 'Adjamé',
    image: 'https://picsum.photos/seed/saintluc/800/600',
    slug: 'saint-luc-220-logements',
    lat: 5.3700,
    lng: -4.0170,
  },
  {
    id: '20',
    name: 'Saint Thomas (Agban Village)',
    city: 'Abidjan',
    district: 'Adjamé',
    image: 'https://picsum.photos/seed/saintthomas/800/600',
    slug: 'saint-thomas-agban-village',
    lat: 5.3680,
    lng: -4.0120,
  },
  {
    id: '21',
    name: 'Saint Kizito (Williamsville)',
    city: 'Abidjan',
    district: 'Adjamé',
    image: 'https://picsum.photos/seed/saintkizito/800/600',
    slug: 'saint-kizito-williamsville',
    lat: 5.3720,
    lng: -4.0080,
  },
  {
    id: '22',
    name: 'Sanctuaire Marial (Cité Fairmont)',
    city: 'Abidjan',
    district: 'Adjamé',
    image: 'https://picsum.photos/seed/sanctuaire/800/600',
    slug: 'sanctuaire-marial-cite-fairmont',
    lat: 5.3580,
    lng: -4.0200,
  },

  // ── ATTÉCOUBÉ (Archidiocèse d'Abidjan) ───────────────────────────────────
  {
    id: '23',
    name: 'Saint Joseph Artisan (Attécoubé)',
    city: 'Abidjan',
    district: 'Attécoubé',
    image: 'https://picsum.photos/seed/saintjoseph/800/600',
    slug: 'saint-joseph-artisan-attecoube',
    lat: 5.3490,
    lng: -4.0420,
  },
  {
    id: '24',
    name: 'Notre Dame de la Paix (Synatresor)',
    city: 'Abidjan',
    district: 'Attécoubé',
    image: 'https://picsum.photos/seed/ndpaix/800/600',
    slug: 'notre-dame-paix-synatresor',
    lat: 5.3520,
    lng: -4.0380,
  },
  {
    id: '25',
    name: 'Saint Jean Marie Vianney (Cité Prestige)',
    city: 'Abidjan',
    district: 'Attécoubé',
    image: 'https://picsum.photos/seed/vianney/800/600',
    slug: 'saint-jean-marie-vianney-cite-prestige',
    lat: 5.3460,
    lng: -4.0480,
  },
  {
    id: '26',
    name: 'Sainte Anne (Attécoubé)',
    city: 'Abidjan',
    district: 'Attécoubé',
    image: 'https://picsum.photos/seed/sainteanneatt/800/600',
    slug: 'sainte-anne-attecoube',
    lat: 5.3540,
    lng: -4.0450,
  },

  // ── MARCORY (Archidiocèse d'Abidjan) ─────────────────────────────────────
  {
    id: '27',
    name: 'Sainte Bernadette (Marcory)',
    city: 'Abidjan',
    district: 'Marcory',
    image: 'https://picsum.photos/seed/bernadette/800/600',
    slug: 'sainte-bernadette-marcory',
    lat: 5.3008,
    lng: -3.9980,
  },
  {
    id: '28',
    name: 'Saint Pierre (Anoumabo)',
    city: 'Abidjan',
    district: 'Marcory',
    image: 'https://picsum.photos/seed/saintpierremarcory/800/600',
    slug: 'saint-pierre-anoumabo',
    lat: 5.2980,
    lng: -4.0050,
  },
  {
    id: '29',
    name: 'Sainte Marie Mère de Dieu (Aliodan)',
    city: 'Abidjan',
    district: 'Marcory',
    image: 'https://picsum.photos/seed/mariemerededieu/800/600',
    slug: 'sainte-marie-mere-dieu-aliodan',
    lat: 5.3050,
    lng: -3.9920,
  },
  {
    id: '30',
    name: 'Notre Dame de Cana (Agnissankoi)',
    city: 'Abidjan',
    district: 'Marcory',
    image: 'https://picsum.photos/seed/ndcana/800/600',
    slug: 'notre-dame-cana-agnissankoi',
    lat: 5.3020,
    lng: -3.9960,
  },
];

const today = new Date().toISOString().split('T')[0];

const MOCK_PROGRAMMES: Programme[] = [
  // Cocody
  { id: '101', title: 'Messe du Dimanche', type: 'messe', paroisseId: '1', paroisseName: 'Saint Jean de Cocody', date: today, time: '08:00', description: 'Messe dominicale en langue française.' },
  { id: '102', title: 'Messe des Familles', type: 'messe', paroisseId: '1', paroisseName: 'Saint Jean de Cocody', date: today, time: '10:30', description: 'Célébration eucharistique pour les familles avec animations jeunesse.' },
  { id: '103', title: 'Vêpres & Adoration', type: 'messe', paroisseId: '2', paroisseName: 'Saint Albert le Grand (CCEA)', date: today, time: '17:00', description: 'Prière des vêpres suivie d\'une heure d\'adoration eucharistique.' },
  { id: '104', title: 'Messe Étudiante', type: 'messe', paroisseId: '2', paroisseName: 'Saint Albert le Grand (CCEA)', date: today, time: '10:00', description: 'Messe spéciale pour la communauté universitaire du CCEA.' },
  { id: '105', title: 'Récollection de la JEC', type: 'evenement', paroisseId: '3', paroisseName: 'Saint Jacques des Deux Plateaux', date: today, time: '09:00', description: 'Journée de récollection pour les jeunes de la Jeunesse Étudiante Catholique.' },
  { id: '106', title: 'Messe du Dimanche', type: 'messe', paroisseId: '4', paroisseName: 'Sainte Cécile des Vallons', date: today, time: '09:30', description: 'Célébration eucharistique dominicale.' },
  { id: '107', title: 'Concert de Louange', type: 'evenement', paroisseId: '5', paroisseName: 'Sainte Famille de la Riviera', date: today, time: '16:00', description: 'Concert de louange et d\'adoration animé par la chorale paroissiale.' },

  // Yopougon
  { id: '108', title: 'Messe Solennelle — Cathédrale', type: 'messe', paroisseId: '8', paroisseName: 'Cathédrale Saint André (SICOGI)', date: today, time: '09:00', description: 'Messe solennelle présidée par l\'Évêque du diocèse de Yopougon.' },
  { id: '109', title: 'Messe du Dimanche', type: 'messe', paroisseId: '9', paroisseName: 'Saint Marc (Toits Rouges)', date: today, time: '08:30', description: 'Célébration eucharistique dominicale.' },
  { id: '110', title: 'Chemin de Croix', type: 'evenement', paroisseId: '10', paroisseName: 'Saint Pierre de Niangon Sud', date: today, time: '07:00', description: 'Chemin de croix communautaire dans l\'enceinte de la paroisse.' },
  { id: '111', title: 'Messe des Jeunes', type: 'messe', paroisseId: '11', paroisseName: 'Saint Matthieu (Cité Verte)', date: today, time: '10:00', description: 'Messe animée par les mouvements de jeunesse de la paroisse.' },
  { id: '112', title: 'Annonce : Retraite Spirituelle', type: 'annonce', paroisseId: '12', paroisseName: 'Sainte Rita (Niangon Nord)', date: today, time: '00:00', description: 'Retraite spirituelle du 25 au 27 avril 2026. Inscriptions ouvertes au secrétariat paroissial.' },
  { id: '113', title: 'Messe du Dimanche', type: 'messe', paroisseId: '13', paroisseName: 'Saint Laurent (Kouté)', date: today, time: '09:00', description: 'Célébration eucharistique dominicale.' },

  // Adjamé
  { id: '114', title: 'Messe du Dimanche', type: 'messe', paroisseId: '17', paroisseName: 'Saint Michel (Adjamé)', date: today, time: '08:00', description: 'Célébration eucharistique présidée par les Pères SMA.' },
  { id: '115', title: 'Baptêmes des adultes', type: 'evenement', paroisseId: '18', paroisseName: 'Saint Charles Lwanga (Adjamé)', date: today, time: '11:00', description: 'Cérémonie de baptêmes des catéchumènes adultes de la paroisse.' },
  { id: '116', title: 'Messe du Dimanche', type: 'messe', paroisseId: '19', paroisseName: 'Saint Luc (220 Logements)', date: today, time: '09:30', description: 'Célébration eucharistique dominicale.' },
  { id: '117', title: 'Annonce : Quête de Pâques', type: 'annonce', paroisseId: '20', paroisseName: 'Saint Thomas (Agban Village)', date: today, time: '00:00', description: 'La quête spéciale de Pâques sera organisée ce dimanche. Votre générosité soutient les œuvres de la paroisse.' },

  // Attécoubé
  { id: '118', title: 'Messe du Dimanche', type: 'messe', paroisseId: '23', paroisseName: 'Saint Joseph Artisan (Attécoubé)', date: today, time: '09:00', description: 'Célébration eucharistique dominicale.' },
  { id: '119', title: 'Pèlerinage Marial', type: 'evenement', paroisseId: '24', paroisseName: 'Notre Dame de la Paix (Synatresor)', date: today, time: '06:30', description: 'Pèlerinage paroissial en l\'honneur de Notre Dame de la Paix.' },
  { id: '120', title: 'Messe des Enfants', type: 'messe', paroisseId: '25', paroisseName: 'Saint Jean Marie Vianney (Cité Prestige)', date: today, time: '10:00', description: 'Messe animée par les enfants du catéchisme de la paroisse.' },

  // Marcory
  { id: '121', title: 'Messe du Dimanche', type: 'messe', paroisseId: '27', paroisseName: 'Sainte Bernadette (Marcory)', date: today, time: '08:30', description: 'Célébration eucharistique dominicale.' },
  { id: '122', title: 'Messe du Dimanche', type: 'messe', paroisseId: '28', paroisseName: 'Saint Pierre (Anoumabo)', date: today, time: '09:00', description: 'Célébration eucharistique dominicale.' },
  { id: '123', title: 'Soirée de Louange', type: 'evenement', paroisseId: '29', paroisseName: 'Sainte Marie Mère de Dieu (Aliodan)', date: today, time: '18:00', description: 'Soirée de louange et d\'intercession organisée par le mouvement charismatique.' },
  { id: '124', title: 'Annonce : Préparation au Mariage', type: 'annonce', paroisseId: '30', paroisseName: 'Notre Dame de Cana (Agnissankoi)', date: today, time: '00:00', description: 'Nouvelle session de préparation au mariage. Inscriptions dès aujourd\'hui au secrétariat.' },
];



const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export function usePublicApi() {
  const getParoisses = async (userLocation?: { lat: number, lng: number }) => {
    if (!userLocation) return MOCK_PAROISSES;
    
    return MOCK_PAROISSES.map(p => ({
      ...p,
      distance: calculateDistance(userLocation.lat, userLocation.lng, p.lat, p.lng)
    })).sort((a, b) => (a.distance || 0) - (b.distance || 0));
  };
  
  const getProgrammes = async (userLocation?: { lat: number, lng: number }, radius: number = 20, filterDate?: string, paroisseId?: string) => {
    let filtered = [...MOCK_PROGRAMMES];
    
    if (filterDate) {
      filtered = filtered.filter(p => p.date === filterDate);
    }

    if (paroisseId && paroisseId !== 'all') {
      filtered = filtered.filter(p => p.paroisseId === paroisseId);
    }

    if (!userLocation || (paroisseId && paroisseId !== 'all')) return filtered;
    
    const nearbyParoisses = MOCK_PAROISSES
      .map(p => ({ ...p, distance: calculateDistance(userLocation.lat, userLocation.lng, p.lat, p.lng) }))
      .filter(p => p.distance <= radius)
      .map(p => p.id);
      
    return filtered.filter(pr => nearbyParoisses.includes(pr.paroisseId));
  };
  
  const getProgrammesByParoisse = async (paroisseId: string) => {
    // Simulated: In a real app we'd filter by current week start/end
    return MOCK_PROGRAMMES.filter(p => p.paroisseId === paroisseId);
  };

  const getProgrammeById = async (id: string) => MOCK_PROGRAMMES.find(p => p.id === id);
  const getParoisseBySlug = async (slug: string) => MOCK_PAROISSES.find(p => p.slug === slug);

  return { getParoisses, getProgrammes, getProgrammesByParoisse, getProgrammeById, getParoisseBySlug };
}
