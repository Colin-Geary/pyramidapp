import { State } from './mtn-proj.reducers';
import { createSelector } from '@ngrx/store';
import {
  MtnProjRoute,
  ClimbingRating,
  RouteEntity,
  CLIMBING_RATING_ORDER
} from 'src/app/models/mtn-proj.models';

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
  (routes: MtnProjRoute[]) => {
    const entityMap: RouteEntity = {};
    routes.forEach(r => {
      let rating = r.rating;
      if (rating === '5.11-') {
        rating = '5.11a';
      }

      if (!CLIMBING_RATING_ORDER.includes(rating)) {
        return;
      }

      if (entityMap[rating]) {
        entityMap[rating]++;
      } else {
        entityMap[rating] = 1;
      }
    });

    return Object.keys(entityMap).length ? entityMap : null;
  }
);

export const loadingSelector = createSelector(
  selectPyramid,
  (state: State) => state.loading
);

export const loadedSelector = createSelector(
  selectPyramid,
  (state: State) => state.loaded
);
