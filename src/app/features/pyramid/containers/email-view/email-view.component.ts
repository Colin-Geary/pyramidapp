import { Component, OnInit } from '@angular/core';
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
import { Observable } from 'rxjs';
import {
  selectTicks,
  selectRoutes,
  selectRouteRatings
} from 'src/app/store/mtn-proj/mtn-proj.selectors';

@Component({
  selector: 'app-email-view',
  templateUrl: './email-view.component.html',
  styleUrls: ['./email-view.component.scss']
})
export class EmailViewComponent implements OnInit {
  routeRatings$: Observable<RouteEntity>;

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.routeRatings$ = this.store.pipe(select(selectRouteRatings));
  }

  onClick() {
    this.store.dispatch(setEmailAction({ email: 'cgeary97@gmail.com' }));
  }

  onClickRouteIds() {
    this.store.dispatch(getUserTicks());
  }
}
