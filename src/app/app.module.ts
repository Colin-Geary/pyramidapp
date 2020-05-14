import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import * as fromMtnProject from './store/mtn-proj/mtn-proj.reducers';
import { EffectsModule } from '@ngrx/effects';
import { MtnProjectEffects } from './store/mtn-proj/mtn-proj.effects';
import { EmailViewModule } from './features/pyramid/containers/email-view/email-view.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { KeyInterceptor } from './features/pyramid/interceptors/pyramid.interceptor';
import { EmailResolver } from './shared/resolvers/email.resolver';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      pyramid: fromMtnProject.reducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([MtnProjectEffects]),
    EmailViewModule,
  ],
  providers: [
    EmailResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeyInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
