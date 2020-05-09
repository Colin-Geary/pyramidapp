import { createReducer, on, Action } from '@ngrx/store';
import {
  getUserTicks,
  setEmailAction,
  getUserTicksSuccess,
  getUserTickFailure,
  getUserRoutesSuccess
} from './mtn-proj.actions';
import { MtnProjTick, MtnProjRoute } from 'src/app/models/mtn-proj.models';

export interface State {
  email: string;
  ticks: MtnProjTick[];
  routes: MtnProjRoute[];
  loading: boolean;
  loaded: boolean;
}

const initialState: State = {
  email: '',
  ticks: [],
  routes: [],
  loading: false,
  loaded: false
};

const mtnProjectReducer = createReducer(
  initialState,
  on(getUserTicks, state => ({ ...state, loading: true, loaded: false })),
  on(getUserTickFailure, state => ({
    ...state,
    loading: false,
    loaded: false
  })),
  on(getUserTicksSuccess, (state, { ticks }) => ({
    ...state,
    ticks,
    loading: false,
    loaded: true
  })),
  on(getUserRoutesSuccess, (state, { routes }) => ({
    ...state,
    routes,
    loading: false,
    loaded: true
  })),
  on(setEmailAction, (state, { email }) => ({ ...state, email }))
);

export function reducer(state: State | undefined, action: Action) {
  return mtnProjectReducer(state, action);
}
