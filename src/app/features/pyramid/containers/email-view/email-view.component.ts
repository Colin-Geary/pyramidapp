import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  setEmailAction,
  getUserTicks
} from 'src/app/store/mtn-proj/mtn-proj.actions';
import { MtnProjTick } from 'src/app/models/mtn-proj.models';
import { Observable } from 'rxjs';
import { selectTicks } from 'src/app/store/mtn-proj/mtn-proj.selectors';

@Component({
  selector: 'app-email-view',
  templateUrl: './email-view.component.html',
  styleUrls: ['./email-view.component.scss']
})
export class EmailViewComponent implements OnInit {
  ticks$: Observable<MtnProjTick[]>;

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.ticks$ = this.store.pipe(select(selectTicks));
  }

  onClick() {
    this.store.dispatch(setEmailAction({ email: 'cgeary97@gmail.com' }));
  }

  onClickRouteIds() {
    this.store.dispatch(getUserTicks());
  }
}
