import { createReducer, on, Action } from '@ngrx/store';
import {
  getUserTicks,
  setEmailAction,
  getUserTicksSuccess,
  getUserTickFailure,
  getUserRoutesSuccess,
  setMinGradeAction,
  setMaxGradeAction,
} from './mtn-proj.actions';
import {
  MtnProjTick,
  MtnProjRoute,
  ClimbingRating,
  CLIMBING_RATING_ORDER,
} from 'src/app/models/mtn-proj.models';

export interface State {
  email: string;
  ticks: MtnProjTick[];
  routes: MtnProjRoute[];
  minGrade: string;
  maxGrade: string;
  loading: boolean;
  loaded: boolean;
}

const initialState: State = {
  email: '',
  ticks: [],
  routes: [],
  minGrade: CLIMBING_RATING_ORDER[0],
  maxGrade: CLIMBING_RATING_ORDER[CLIMBING_RATING_ORDER.length - 1],
  loading: false,
  loaded: false,
};

const mtnProjectReducer = createReducer(
  initialState,
  on(getUserTicks, (state) => ({
    ...state,
    loading: true,
    loaded: false,
  })),
  on(getUserTickFailure, (state) => ({
    ...state,
    ticks: [],
    routes: [],
    loading: false,
    loaded: false,
  })),
  on(getUserTicksSuccess, (state, { ticks }) => ({
    ...state,
    ticks,
    loading: false,
    loaded: true,
  })),
  on(getUserRoutesSuccess, (state, { routes }) => ({
    ...state,
    routes,
    loading: false,
    loaded: true,
  })),
  on(setEmailAction, (state, { email }) => ({ ...state, email })),
  on(setMinGradeAction, (state, { min }) => ({
    ...state,
    minGrade: min,
  })),
  on(setMaxGradeAction, (state, { max }) => {
    const index = CLIMBING_RATING_ORDER.indexOf(max);
    const min = index - 8 >= 0 ? index - 8 : 0;
    const split = CLIMBING_RATING_ORDER.slice(min, index);
    const minGrade = split[0];

    return {
      ...state,
      maxGrade: max,
      minGrade,
    };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return mtnProjectReducer(state, action);
}
