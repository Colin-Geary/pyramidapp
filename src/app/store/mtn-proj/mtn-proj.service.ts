import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  MtnProjTickResponse,
  MtnProjTick,
  MtnProjRoute
} from 'src/app/models/mtn-proj.models';

@Injectable({
  providedIn: 'root'
})
export class MtnProjService {
  constructor(private http: HttpClient) {}

  getUserTicks(email: string) {
    return this.http.get<MtnProjTickResponse>(
      `https://www.mountainproject.com/data/get-ticks?email=${email}`
    );
  }

  getRoutesFromIds(routeIds: number[]) {
    return this.http.get<{ routes: MtnProjRoute[] }>(
      `https://www.mountainproject.com/data/get-routes?routeIds=${routeIds}`
    );
  }
}
