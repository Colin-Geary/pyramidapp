import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MtnProjTickResponse } from 'src/app/models/mtn-proj.models';

@Injectable({
  providedIn: 'root'
})
export class MtnProjService {
  constructor(private http: HttpClient) {}

  getRouteIds(email: string) {
    return this.http.get<MtnProjTickResponse>(
      `https://www.mountainproject.com/data/get-ticks?email=${email}&key=200749834-e4eb848bdff7842a7ce20605e4c2fdee`
    );
  }
}
