import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  tap,
  concatMap,
  withLatestFrom,
  exhaustMap,
  map
} from 'rxjs/operators';
import { GET_USER_TICKS, getUserTicksSuccess } from './mtn-proj.actions';
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
  loadRouteIds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GET_USER_TICKS),
      concatMap(action =>
        of(action).pipe(withLatestFrom(this.store.pipe(select(selectEmail))))
      ),
      exhaustMap(([action, email]) =>
        this.mtnProjectService.getRouteIds(email).pipe(
          map(({ ticks }) => {
            console.log('ticks: ', ticks);
            return getUserTicksSuccess({ ticks });
          })
        )
      )
    )
  );
}
