import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IconModule } from '@novyk/ikong';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    IconModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
