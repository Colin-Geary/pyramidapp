import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailViewComponent } from './email-view.component';

@NgModule({
  declarations: [EmailViewComponent],
  imports: [CommonModule],
  exports: [EmailViewComponent]
})
export class EmailViewModule {}
