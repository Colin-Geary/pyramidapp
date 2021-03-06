import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  setEmailAction,
  getUserTicks,
  setMinGradeAction,
  setMaxGradeAction,
} from 'src/app/store/mtn-proj/mtn-proj.actions';
import {
  MtnProjTick,
  MtnProjRoute,
  ClimbingRating,
  RouteEntity,
  CLIMBING_RATING_ORDER,
  PyramidModel,
  PYRAMID_MODELS,
} from 'src/app/models/mtn-proj.models';
import { Observable } from 'rxjs';
import {
  selectRoutes,
  selectRouteRatings,
  loadingSelector,
  loadedSelector,
  minMaxGradeSelector,
} from 'src/app/store/mtn-proj/mtn-proj.selectors';
import { FormControl, Validators } from '@angular/forms';
import {
  debounceTime,
  filter,
  withLatestFrom,
  switchMap,
  tap,
  map,
  merge,
} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-email-view',
  templateUrl: './email-view.component.html',
  styleUrls: ['./email-view.component.scss'],
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
  sinceDate: FormControl = new FormControl();
  pyramidType: FormControl = new FormControl(null, []);
  pyramidTypes: PyramidModel[] = PYRAMID_MODELS;
  selectedPyramidHelperText: { title: string; subText: string };
  max: number;
  min: number;
  climbingGrades: string[] = CLIMBING_RATING_ORDER;
  climbingGradesDescending: string[] = [...CLIMBING_RATING_ORDER].reverse();

  constructor(
    private store: Store<any>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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
      .pipe(
        filter((val) => this.email.valid),
        merge(this.sinceDate.valueChanges),
        withLatestFrom(this.email.valueChanges, this.sinceDate.valueChanges)
      )
      .subscribe((val) => {
        const email = val[1];
        const sinceDate = val[2];
        this.store.dispatch(setEmailAction({ email }));
        this.store.dispatch(getUserTicks({ date: sinceDate }));
      });
    this.minGrade.valueChanges.subscribe((min) =>
      this.store.dispatch(setMinGradeAction({ min }))
    );
    this.maxGrade.valueChanges.subscribe((max) =>
      this.store.dispatch(setMaxGradeAction({ max }))
    );
    this.pyramidType.valueChanges
      .pipe(withLatestFrom(this.minMaxGrade$))
      .subscribe(([value, { min, max }]) => {
        this.selectedPyramidHelperText = PYRAMID_MODELS.find(
          (p) => p.name === value
        ).helperText;
      });

    this.idealRouteRatings$ = this.pyramidType.valueChanges.pipe(
      merge(this.minMaxGrade$),
      withLatestFrom(this.minMaxGrade$),
      map(([val, { min, max }]) => {
        return this.getIdealEntityMap(
          max as ClimbingRating,
          min as ClimbingRating
        );
      })
    );

    this.minMaxClimbs$ = this.idealRouteRatings$.pipe(
      map((entity) => {
        const values = Object.values(entity);
        const min = Math.min(...values);
        const max = Math.max(...values);
        return { min, max };
      })
    );

    this.sinceDate.setValue('all-time');
    this.maxGrade.setValue(this.climbingGradesDescending[0]);

    // this.minGrade.setValue(this.climbingGrades[0]);
    this.pyramidType.setValue(PYRAMID_MODELS[0].name);
    if (this.route.snapshot.data.email) {
      this.email.setValue(this.route.snapshot.data.email);
      this.store.dispatch(
        setEmailAction({ email: this.route.snapshot.data.email })
      );
      if (this.route.snapshot.data.ticks) {
        this.store.dispatch(
          getUserTicks({ date: this.route.snapshot.data.ticks })
        );
      } else {
        this.store.dispatch(getUserTicks({ date: 'all-time' }));
      }
    }
  }

  getIdealEntityMap(
    idealGrade: ClimbingRating,
    lowerBound: ClimbingRating
  ): RouteEntity {
    const grades = CLIMBING_RATING_ORDER.slice(
      CLIMBING_RATING_ORDER.indexOf(lowerBound),
      CLIMBING_RATING_ORDER.indexOf(idealGrade) + 1
    );
    // const count = grades.length;
    const pyramidCounts = PYRAMID_MODELS.find(
      (p) => p.helperText === this.selectedPyramidHelperText
    ).value;
    if (pyramidCounts.length > grades.length) {
      pyramidCounts.splice(0, pyramidCounts.length - grades.length);
    }

    const entityMap: RouteEntity = {};
    for (let i = 0; i < grades.length; i++) {
      entityMap[grades[i]] = pyramidCounts[i];
    }

    return entityMap;
  }
}
