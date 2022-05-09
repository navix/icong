import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from 'icong';

import { LazyModuleRoutingModule } from './lazy-module-routing.module';
import { LazyComponent } from './lazy/lazy.component';
import { Lazy2Component } from './lazy2/lazy2.component';
import { LazyUrlComponent } from './lazy-url/lazy-url.component';

@NgModule({
  declarations: [LazyComponent, Lazy2Component, LazyUrlComponent],
  imports: [
    CommonModule,
    LazyModuleRoutingModule,
    IconModule,
  ],
})
export class LazyModuleModule {
}
