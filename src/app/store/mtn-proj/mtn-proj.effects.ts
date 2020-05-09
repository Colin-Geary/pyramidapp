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
  getUserRoutesSuccess
} from './mtn-proj.actions';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from './mtn-proj.reducers';
import { selectEmail, selectPyramid } from './mtn-proj.selectors';
import { MtnProjService } from './mtn-proj.service';

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
            console.log('ticks concat: ', ticks);
            const routeIds = ticks.map(t => t.routeId);
            return this.mtnProjectService
              .getRoutesFromIds(routeIds)
              .pipe(map(routes => ({ routes, ticks })));
          }),
          tap(stuff => console.log('stuff: ', stuff)),
          mergeMap(({ ticks, routes }) => [
            getUserTicksSuccess({ ticks }),
            getUserRoutesSuccess({ routes: routes.routes })
          ]),
          catchError(err => of(getUserTickFailure()))
        )
      )
    )
  );
}
