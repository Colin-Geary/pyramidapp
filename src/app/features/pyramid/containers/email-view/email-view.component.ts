import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  setEmailAction,
  getUserTicks
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
  loadedSelector
} from 'src/app/store/mtn-proj/mtn-proj.selectors';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

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
  email: FormControl = new FormControl(null, [Validators.email]);
  idealRouteRatings: RouteEntity;
  max: number;
  min: number;

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.routeRatings$ = this.store.pipe(
      select(selectRouteRatings, { min: '5.10a', max: '5.13a' })
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

    this.idealRouteRatings = this.getIdealEntityMap('5.13a', '5.10a');
    const values = Object.values(this.idealRouteRatings);
    this.max = Math.max(...values);
    this.min = Math.min(...values);
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
