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
