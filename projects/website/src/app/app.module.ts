import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IconModule } from 'icong';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StandaloneComponent } from './standalone/standalone.component';

@NgModule({
  imports: [
    BrowserModule,
    IconModule,
    AppRoutingModule,
    StandaloneComponent,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
