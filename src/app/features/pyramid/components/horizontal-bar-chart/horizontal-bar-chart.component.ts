import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import {
  RouteEntity,
  CLIMBING_RATING_ORDER
} from 'src/app/models/mtn-proj.models';

@Component({
  selector: 'app-horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrls: ['./horizontal-bar-chart.component.scss']
})
export class HorizontalBarChartComponent implements OnInit {
  @Input()
  routeEntity: RouteEntity;

  barChartLabels: Label[];
  barChartData: ChartDataSets[];

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
            callback: function(value: any) {
              if (value % 1 === 0) {
                return value;
              }
            }
          }
        }
      ]
    }
  };
  // barChartLabels: Label[] = [
  //   '2006',
  //   '2007',
  //   '2008',
  //   '2009',
  //   '2010',
  //   '2011',
  //   '2012'
  // ];
  barChartType: ChartType = 'horizontalBar';
  barChartLegend = true;
  barChartPlugins = [];

  // barChartData: ChartDataSets[] = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  // ];

  constructor() {}

  ngOnInit() {
    this.barChartLabels = this.sortRatings(Object.keys(this.routeEntity));
    this.barChartData = [
      {
        data: Object.values(this.routeEntity),
        label: 'Sends',
        backgroundColor: '#fcb900',
        hoverBackgroundColor: '#ffce49'
      }
    ];
  }

  private sortRatings(ratingsArray: string[]) {
    const itemsArray = [...ratingsArray];
    itemsArray.sort(function(a, b) {
      return (
        CLIMBING_RATING_ORDER.indexOf(b) - CLIMBING_RATING_ORDER.indexOf(a)
      );
    });

    return itemsArray;
  }
}
