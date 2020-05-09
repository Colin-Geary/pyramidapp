import { State } from './mtn-proj.reducers';
import { createSelector } from '@ngrx/store';

export interface AppState {
  pyramid: State;
}

export const selectPyramid = (state: AppState) => state.pyramid;

export const selectEmail = createSelector(
  selectPyramid,
  (state: State) => state.email
);

export const selectTicks = createSelector(
  selectPyramid,
  (state: State) => state.ticks
);
