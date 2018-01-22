import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './/app-routing.module';
import { IndexComponent } from './index/index.component';
import { HttpClientModule } from '@angular/common/http';
import { TmdbService } from './services/tmdb.service';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

import { TabsModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { SafePipe } from './safe-pipe.pipe';
import { LanguagePipe } from './language-pipe.pipe';
import { TimePipe } from './time-pipe.pipe';
import { CastComponent } from './cast/cast.component';
import { OverviewComponent } from './overview/overview.component';





@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    MovieDetailsComponent,
    SafePipe,
    LanguagePipe,
    TimePipe,
    CastComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [TmdbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
