import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import {
  RouteEntity,
  CLIMBING_RATING_ORDER,
} from 'src/app/models/mtn-proj.models';

@Component({
  selector: 'app-horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrls: ['./horizontal-bar-chart.component.scss'],
})
export class HorizontalBarChartComponent implements OnInit, OnChanges {
  @ViewChild('myChart')
  chart: any;

  @Input()
  idealRouteEntity: RouteEntity;

  @Input()
  actualRouteEntity: RouteEntity;

  @Input()
  labelName: string;

  @Input()
  color: string;
  @Input()
  hoverColor: string;

  @Input()
  max: number;
  @Input()
  min: number;

  screenHeight: number;
  screenWidth: number;

  barChartLabels: Label[];
  barChartData: ChartDataSets[];

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
            callback: function (value: any) {
              if (value % 1 === 0) {
                return value;
              }
            },
            max: this.max,
            min: this.min,
          },
        },
      ],
    },
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
  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    this.ngOnInit();
  }

  ngOnInit() {
    const { barChartData, barChartLabels } = this.getChartLabelsAndValues(
      this.idealRouteEntity,
      '#333333',
      'Ideal Pyramid',
      '#5c5c5c'
    );
    const { barChartData: actualBarChartData } = this.getChartLabelsAndValues(
      this.actualRouteEntity,
      this.color,
      this.labelName,
      this.hoverColor
    );
    this.barChartLabels = barChartLabels;
    this.barChartData = [...barChartData, ...actualBarChartData];
  }

  getChartLabelsAndValues(
    routeEntity: RouteEntity,
    color: string,
    label: string,
    hoverColor: string
  ) {
    const difficulties = Object.keys(routeEntity);
    const counts = Object.values(routeEntity);
    const joinedDifficultyAndCount = difficulties.map((d, index) => {
      return { difficulty: d, count: counts[index] };
    });
    const sorted = this.sortRatingsAndDifficulties(joinedDifficultyAndCount);
    const barChartLabels = sorted.map((v) => v.difficulty);
    const barChartData = [
      {
        data: sorted.map((v) => v.count),
        label: label,
        backgroundColor: color,
        hoverBackgroundColor: hoverColor,
      },
    ];
    return { barChartData, barChartLabels };
  }

  private sortRatingsAndDifficulties(
    ratingsArray: { difficulty: string; count: number }[]
  ) {
    const itemsArray = [...ratingsArray];
    itemsArray.sort(function (a, b) {
      return (
        CLIMBING_RATING_ORDER.indexOf(b.difficulty) -
        CLIMBING_RATING_ORDER.indexOf(a.difficulty)
      );
    });

    return itemsArray;
  }

  toggleIdeal() {
    const copy = [...this.barChartData];
    copy[0].hidden = !copy[0].hidden;
    this.barChartData = copy;
  }
}
