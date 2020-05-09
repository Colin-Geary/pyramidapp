import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailViewComponent } from './email-view.component';
import { HorizontalBarChartModule } from '../../components/horizontal-bar-chart/horizontal-bar-chart.module';

@NgModule({
  declarations: [EmailViewComponent],
  imports: [CommonModule, HorizontalBarChartModule],
  exports: [EmailViewComponent]
})
export class EmailViewModule {}
