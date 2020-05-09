import { State } from './mtn-proj.reducers';
import { createSelector } from '@ngrx/store';
import { MtnProjRoute } from 'src/app/models/mtn-proj.models';

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

export const selectRoutes = createSelector(
  selectPyramid,
  (state: State) => state.routes
);

export const selectRouteRatings = createSelector(
  selectRoutes,
  (routes: MtnProjRoute[]) => routes.map(r => r.rating)
);
