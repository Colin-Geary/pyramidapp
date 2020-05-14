import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailViewComponent } from './features/pyramid/containers/email-view/email-view.component';
import { EmailResolver } from './shared/resolvers/email.resolver';
import { TicksResolver } from './shared/resolvers/ticks.resolver';

const routes: Routes = [
  {
    path: '**',
    component: EmailViewComponent,
    pathMatch: 'full',
    resolve: { email: EmailResolver, ticks: TicksResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
