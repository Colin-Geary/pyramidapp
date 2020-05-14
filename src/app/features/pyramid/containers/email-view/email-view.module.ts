import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailViewComponent } from './email-view.component';
import { HorizontalBarChartModule } from '../../components/horizontal-bar-chart/horizontal-bar-chart.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from 'src/app/shared/components/spinner/spinner.module';
// import { ShareButtonsModule } from '@ngx-share/buttons';
import { HttpClientModule } from '@angular/common/http';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

@NgModule({
  declarations: [EmailViewComponent],
  imports: [
    CommonModule,
    HorizontalBarChartModule,
    ReactiveFormsModule,
    SpinnerModule,
    ShareButtonsModule,
    ShareIconsModule.forRoot(),
    HttpClientModule,
  ],
  exports: [EmailViewComponent],
})
export class EmailViewModule {}
