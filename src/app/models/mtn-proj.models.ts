export interface MtnProjTickResponse {
  average: string;
  hardest: string;
  success: number;
  ticks: MtnProjTick[];
}

export interface MtnProjTick {
  date: string;
  leadStyle: 'Flash' | 'Redpoint';
  notes: number;
  pitches: number;
  routeId: number;
  style: 'Lead';
  tickId: number;
  userRating: string;
  userStars: number;
}

export type ClimbingRating =
  | '5.5'
  | '5.6'
  | '5.7'
  | '5.8'
  | '5.9'
  | '5.10a'
  | '5.10b'
  | '5.10c'
  | '5.10d'
  | '5.11a'
  | '5.11b'
  | '5.11c'
  | '5.11d'
  | '5.12a'
  | '5.12b'
  | '5.12c'
  | '5.12d'
  | '5.13a'
  | '5.13b'
  | '5.13c'
  | '5.13d';

export interface MtnProjRoute {
  id: number;
  name: string;
  type: 'Sport';
  rating: ClimbingRating;
  stars: number;
  starVotes: number;
  pitches: number;
  location: string[];
  url: string;
  imgSqSmall: string;
  imgSmall: string;
  imgSmallMed: string;
  imgMedium: string;
  longitude: number;
  latitude: number;
}
