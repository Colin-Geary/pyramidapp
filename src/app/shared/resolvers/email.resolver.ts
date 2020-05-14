import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class EmailResolver implements Resolve<any> {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot) {
    return route.queryParams.email;
  }
}
