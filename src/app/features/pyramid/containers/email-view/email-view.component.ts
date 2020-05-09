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
  RouteEntity
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
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  email: FormControl = new FormControl(null, [Validators.email]);

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.routeRatings$ = this.store.pipe(select(selectRouteRatings));
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
  }
}
