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
  (
    routes: MtnProjRoute[],
    props: { min: ClimbingRating; max: ClimbingRating }
  ) => {
    const entityMap: RouteEntity = {};
    const grades = CLIMBING_RATING_ORDER.slice(
      CLIMBING_RATING_ORDER.indexOf(props.min),
      CLIMBING_RATING_ORDER.indexOf(props.max) + 1
    );
    grades.map(r => {
      entityMap[r] = 0;
    });
    routes.forEach(r => {
      let rating = r.rating;
      if (rating === '5.11-') {
        rating = '5.11a';
      }

      if (!grades.includes(rating)) {
        return;
      }
      entityMap[rating]++;
    });

    return Object.values(entityMap).reduce((a, b) => a + b) ? entityMap : null;
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
