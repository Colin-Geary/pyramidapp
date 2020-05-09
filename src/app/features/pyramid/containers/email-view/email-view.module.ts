import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailViewComponent } from './email-view.component';
import { HorizontalBarChartModule } from '../../components/horizontal-bar-chart/horizontal-bar-chart.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from 'src/app/shared/components/spinner/spinner.module';

@NgModule({
  declarations: [EmailViewComponent],
  imports: [
    CommonModule,
    HorizontalBarChartModule,
    ReactiveFormsModule,
    SpinnerModule
  ],
  exports: [EmailViewComponent]
})
export class EmailViewModule {}
