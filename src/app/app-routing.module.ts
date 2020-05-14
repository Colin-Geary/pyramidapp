import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailViewComponent } from './features/pyramid/containers/email-view/email-view.component';
import { EmailResolver } from './shared/resolvers/email.resolver';

const routes: Routes = [
  {
    path: '**',
    component: EmailViewComponent,
    pathMatch: 'full',
    resolve: { email: EmailResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
