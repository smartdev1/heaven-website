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

const MOCK_PAROISSES: Paroisse[] = [
  { id: '1', name: 'Notre-Dame des Champs', city: 'Paris', district: '6è', image: 'https://picsum.photos/seed/church1/800/600', slug: 'notre-dame-des-champs', lat: 48.8437, lng: 2.3292 },
  { id: '2', name: 'Saint-Germain-des-Prés', city: 'Paris', district: '6è', image: 'https://picsum.photos/seed/church2/800/600', slug: 'saint-germain', lat: 48.8539, lng: 2.3333 },
  { id: '3', name: 'Saint-Sulpice', city: 'Paris', district: '6è', image: 'https://picsum.photos/seed/church3/800/600', slug: 'saint-sulpice', lat: 48.8509, lng: 2.3344 },
  { id: '4', name: 'Cathédrale de Versailles', city: 'Versailles', district: '', image: 'https://picsum.photos/seed/versailles/800/600', slug: 'versailles-cathedrale', lat: 48.8014, lng: 2.1205 },
];

const MOCK_PROGRAMMES: Programme[] = [
  { id: '101', title: 'Messe du Dimanche', type: 'messe', paroisseId: '1', paroisseName: 'Notre-Dame des Champs', date: '2023-10-22', time: '10:30', description: 'Célébration eucharistique dominicale.' },
  { id: '102', title: 'Concert de Chorale', type: 'evenement', paroisseId: '2', paroisseName: 'Saint-Germain-des-Prés', date: '2023-10-22', time: '15:00', description: 'Chants sacrés par la chorale paroissiale.' },
  { id: '103', title: 'Adoration', type: 'messe', paroisseId: '1', paroisseName: 'Notre-Dame des Champs', date: '2023-10-22', time: '18:30', description: 'Heure sainte et adoration du Saint Sacrement.' },
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
