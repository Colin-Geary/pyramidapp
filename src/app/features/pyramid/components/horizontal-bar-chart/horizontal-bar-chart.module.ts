import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorizontalBarChartComponent } from './horizontal-bar-chart.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [HorizontalBarChartComponent],
  imports: [CommonModule, ChartsModule],
  exports: [HorizontalBarChartComponent]
})
export class HorizontalBarChartModule {}
