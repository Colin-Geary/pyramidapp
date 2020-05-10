import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  tap,
  concatMap,
  withLatestFrom,
  exhaustMap,
  map,
  catchError,
  mergeMap
} from 'rxjs/operators';
import {
  GET_USER_TICKS,
  getUserTicksSuccess,
  getUserTickFailure,
  GET_USER_TICKS_SUCCESS,
  getUserRoutesSuccess,
  setMinGradeAction,
  setMaxGradeAction
} from './mtn-proj.actions';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from './mtn-proj.reducers';
import { selectEmail, selectPyramid } from './mtn-proj.selectors';
import { MtnProjService } from './mtn-proj.service';
import {
  CLIMBING_RATING_ORDER,
  ClimbingRating,
  MtnProjRoute
} from 'src/app/models/mtn-proj.models';

@Injectable()
export class MtnProjectEffects {
  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private mtnProjectService: MtnProjService
  ) {}
  loadUserTicks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GET_USER_TICKS),
      concatMap(action =>
        of(action).pipe(withLatestFrom(this.store.pipe(select(selectEmail))))
      ),
      exhaustMap(([action, email]) =>
        this.mtnProjectService.getUserTicks(email).pipe(
          mergeMap(({ ticks }) => {
            const routeIds = ticks
              .filter(
                t =>
                  t.leadStyle === 'Flash' ||
                  t.leadStyle === 'Onsight' ||
                  t.leadStyle === 'Redpoint'
              )
              .map(t => t.routeId);
            return this.mtnProjectService
              .getRoutesFromIds(routeIds)
              .pipe(map(routes => ({ routes, ticks })));
          }),
          mergeMap(({ ticks, routes }) => {
            const transformedRoutes = transformGrade(routes);
            transformedRoutes.sort((a, b) => {
              return (
                CLIMBING_RATING_ORDER.indexOf(b.rating) -
                CLIMBING_RATING_ORDER.indexOf(a.rating)
              );
            });
            const ratings = transformedRoutes.map(r => r.rating);

            return [
              getUserTicksSuccess({ ticks }),
              getUserRoutesSuccess({ routes: transformedRoutes }),
              setMinGradeAction({
                min: ratings[ratings.length - 1]
              }),
              setMaxGradeAction({ max: ratings[0] })
            ];
          }),
          catchError(err => of(getUserTickFailure()))
        )
      )
    )
  );
}

function transformGrade(routes: { routes: MtnProjRoute[] }) {
  return routes.routes.map(r => {
    let rating = r.rating;
    if (rating === '5.5-' || rating === '5.5+') {
      r.rating = '5.5';
    } else if (rating === '5.6-' || rating === '5.6+') {
      r.rating = '5.6';
    } else if (rating === '5.7-' || rating === '5.7+') {
      r.rating = '5.7';
    } else if (rating === '5.8-' || rating === '5.8+') {
      r.rating = '5.8';
    } else if (rating === '5.9-' || rating === '5.9+') {
      r.rating = '5.9';
    } else if (rating === '5.10a/b') {
      r.rating = '5.10a';
    } else if (rating === '5.10b/c') {
      r.rating = '5.10b';
    } else if (rating === '5.11a/b') {
      r.rating = '5.11a';
    } else if (rating === '5.11b/c') {
      r.rating = '5.11b';
    } else if (rating === '5.12a/b') {
      r.rating = '5.12a';
    } else if (rating === '5.12b/c') {
      r.rating = '5.12b';
    } else if (rating === '5.10c/d') {
      r.rating = '5.10c';
    } else if (rating === '5.11c/d') {
      r.rating = '5.11c';
    } else if (rating === '5.12c/d') {
      r.rating = '5.12c';
    } else if (rating === '5.13a/b') {
      r.rating = '5.13a';
    } else if (rating === '5.13b/c') {
      r.rating = '5.13b';
    } else if (rating === '5.13c/d') {
      r.rating = '5.12c';
    } else if (rating === '5.14a/b') {
      r.rating = '5.14a';
    } else if (rating === '5.14b/c') {
      r.rating = '5.14b';
    } else if (rating === '5.14c/d') {
      r.rating = '5.14c';
    } else if (rating === '5.11-') {
      r.rating = '5.11a';
    } else if (rating === '5.11+') {
      r.rating = '5.11c';
    } else if (rating === '5.12-') {
      r.rating = '5.12a';
    } else if (rating === '5.12+') {
      r.rating = '5.12c';
    }
    return r;
  });
}
