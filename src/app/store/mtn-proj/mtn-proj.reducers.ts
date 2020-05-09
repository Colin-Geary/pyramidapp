import { createReducer, on, Action } from '@ngrx/store';
import {
  getUserTicks,
  setEmailAction,
  getUserTicksSuccess
} from './mtn-proj.actions';
import { MtnProjTick } from 'src/app/models/mtn-proj.models';

export interface State {
  email: string;
  ticks: MtnProjTick[];
  loading: boolean;
  loaded: boolean;
}

const initialState: State = {
  email: '',
  ticks: [],
  loading: false,
  loaded: false
};

const mtnProjectReducer = createReducer(
  initialState,
  on(getUserTicks, state => ({ ...state, loading: true })),
  on(getUserTicksSuccess, (state, { ticks }) => ({
    ...state,
    ticks,
    loading: false,
    loaded: true
  })),
  on(setEmailAction, (state, { email }) => ({ ...state, email }))
);

export function reducer(state: State | undefined, action: Action) {
  return mtnProjectReducer(state, action);
}
