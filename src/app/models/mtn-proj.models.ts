export interface MtnProjTickResponse {
  average: string;
  hardest: string;
  success: number;
  ticks: MtnProjTick[];
}

export interface MtnProjTick {
  date: string;
  leadStyle: 'Flash' | 'Redpoint' | 'Onsight' | 'Pinkpoint';
  notes: number;
  pitches: number;
  routeId: number;
  style: 'Lead';
  tickId: number;
  userRating: string;
  userStars: number;
}

export type ClimbingRating =
  | '5.5-'
  | '5.5'
  | '5.5+'
  | '5.6-'
  | '5.6'
  | '5.6+'
  | '5.7-'
  | '5.7'
  | '5.7+'
  | '5.8-'
  | '5.8'
  | '5.8+'
  | '5.9-'
  | '5.9'
  | '5.9+'
  | '5.10a'
  | '5.10a/b'
  | '5.10b'
  | '5.10b/c'
  | '5.10c'
  | '5.10c/d'
  | '5.10d'
  | '5.11-'
  | '5.11'
  | '5.11+'
  | '5.11a'
  | '5.11a/b'
  | '5.11b'
  | '5.11b/c'
  | '5.11c'
  | '5.11c/d'
  | '5.11d'
  | '5.12-'
  | '5.12'
  | '5.12+'
  | '5.12a'
  | '5.12a/b'
  | '5.12b'
  | '5.12b/c'
  | '5.12c'
  | '5.12c/d'
  | '5.12d'
  | '5.13a'
  | '5.13a/b'
  | '5.13b'
  | '5.13b/c'
  | '5.13c'
  | '5.13c/d'
  | '5.13d'
  | '5.14a'
  | '5.14a/b'
  | '5.14b'
  | '5.14b/c'
  | '5.14c'
  | '5.14c/d'
  | '5.14d';

export const CLIMBING_RATING_ORDER = [
  '5.5',
  '5.6',
  '5.7',
  '5.8',
  '5.9',
  '5.10a',
  '5.10b',
  '5.10c',
  '5.10d',
  '5.11a',
  '5.11b',
  '5.11c',
  '5.11d',
  '5.12a',
  '5.12b',
  '5.12c',
  '5.12d',
  '5.13a',
  '5.13b',
  '5.13c',
  '5.13d',
  '5.14a',
  '5.14b',
  '5.14c',
  '5.14d',
];

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

export interface RouteEntity {
  [key: string]: number;
}

export interface PyramidModel {
  name: string;
  value: number[];
  helperText: { title: string; subText: string };
}

export const PYRAMID_MODELS: PyramidModel[] = [
  {
    name: 'Weekend Warrior',
    value: [5, 4, 3, 2, 1],
    helperText: {
      title: 'Weekend Warrior [5-4-3-2-1]',
      subText:
        'This pyramid is your "average" pyramid. It is best for a climber who gets out on weekends regularly. ',
    },
  },
  {
    name: 'In Season',
    value: [2, 2, 1, 1, 1],
    helperText: {
      title: 'In Season [2-2-1-1-1]',
      subText:
        "This pyramid is a steep pyramid best used when you are already partially through your season. Reference the In Season pyramid when there isn't much time left to send!",
    },
  },
  {
    name: 'Extended',
    value: [12, 8, 4, 2, 1],
    helperText: {
      title: 'Extended [12-8-4-2-1]',
      subText:
        'The Extended pyramid is best used when you have lots of time left. This could be early season or during off season in a gym.',
    },
  },
  {
    name: 'Onsight',
    value: [8, 7, 6, 0, 0],
    helperText: {
      title: 'Onsight [8-7-6-0-0]',
      subText:
        "The Onsight pyramid is used for your traveling trips. Use this on trips that are beyond your local crag. You might only come to these crags a couple times a season. It's best to focus more on your onsight than your max redpoint.",
    },
  },
];
