import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  setEmailAction,
  getUserTicks,
  setMinGradeAction,
  setMaxGradeAction
} from 'src/app/store/mtn-proj/mtn-proj.actions';
import {
  MtnProjTick,
  MtnProjRoute,
  ClimbingRating,
  RouteEntity,
  CLIMBING_RATING_ORDER
} from 'src/app/models/mtn-proj.models';
import { Observable, fromEvent } from 'rxjs';
import {
  selectTicks,
  selectRoutes,
  selectRouteRatings,
  loadingSelector,
  loadedSelector,
  minMaxGradeSelector
} from 'src/app/store/mtn-proj/mtn-proj.selectors';
import { FormControl, Validators } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  withLatestFrom,
  switchMap,
  tap,
  map
} from 'rxjs/operators';

@Component({
  selector: 'app-email-view',
  templateUrl: './email-view.component.html',
  styleUrls: ['./email-view.component.scss']
})
export class EmailViewComponent implements OnInit {
  routeRatings$: Observable<RouteEntity>;
  routes$: Observable<MtnProjRoute[]>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  minMaxGrade$: Observable<{ min: string; max: string }>;
  idealRouteRatings$: Observable<RouteEntity>;
  minMaxClimbs$: Observable<{ min: number; max: number }>;
  email: FormControl = new FormControl(null, [Validators.email]);
  minGrade: FormControl = new FormControl();
  maxGrade: FormControl = new FormControl();
  max: number;
  min: number;
  climbingGrades: string[] = CLIMBING_RATING_ORDER;
  climbingGradesDescending: string[] = [...CLIMBING_RATING_ORDER].reverse();

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.minMaxGrade$ = this.store.pipe(select(minMaxGradeSelector));
    this.minMaxGrade$.subscribe(({ min, max }) => {
      if (this.minGrade.value !== min && this.maxGrade.value !== max) {
        this.maxGrade.setValue(max);
        this.minGrade.setValue(min);
      }
    });
    this.routeRatings$ = this.minMaxGrade$.pipe(
      switchMap(({ min, max }) =>
        this.store.pipe(select(selectRouteRatings, { min, max }))
      )
    );
    this.routes$ = this.store.pipe(select(selectRoutes));
    this.loading$ = this.store
      .pipe(select(loadingSelector))
      .pipe(debounceTime(100));
    this.loaded$ = this.store
      .pipe(select(loadedSelector))
      .pipe(debounceTime(100));

    this.email.valueChanges
      .pipe(filter(val => this.email.valid))
      .subscribe(email => {
        this.store.dispatch(setEmailAction({ email }));
        this.store.dispatch(getUserTicks());
      });
    this.maxGrade.setValue(this.climbingGradesDescending[0]);
    this.minGrade.setValue(this.climbingGrades[0]);
    this.minGrade.valueChanges.subscribe(min =>
      this.store.dispatch(setMinGradeAction({ min }))
    );
    this.maxGrade.valueChanges.subscribe(max =>
      this.store.dispatch(setMaxGradeAction({ max }))
    );

    this.idealRouteRatings$ = this.minMaxGrade$.pipe(
      map(({ min, max }) =>
        this.getIdealEntityMap(max as ClimbingRating, min as ClimbingRating)
      )
    );

    this.minMaxClimbs$ = this.idealRouteRatings$.pipe(
      map(entity => {
        const values = Object.values(entity);
        const min = Math.min(...values);
        const max = Math.max(...values);
        return { min, max };
      })
    );
  }

  getIdealEntityMap(
    idealGrade: ClimbingRating,
    lowerBound: ClimbingRating
  ): RouteEntity {
    const grades = CLIMBING_RATING_ORDER.slice(
      CLIMBING_RATING_ORDER.indexOf(lowerBound),
      CLIMBING_RATING_ORDER.indexOf(idealGrade) + 1
    );
    const count = grades.length;
    const totalClimbsNeeded = (count * count + count) / 2;

    const entityMap: RouteEntity = {};
    for (let i = count; i > 0; i--) {
      const layer = count - i + 1;
      entityMap[grades[i - 1]] = layer;
    }

    return entityMap;
  }
}
