import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@novyk/ikong';

import { LazyModuleRoutingModule } from './lazy-module-routing.module';
import { LazyComponent } from './lazy/lazy.component';

@NgModule({
  declarations: [LazyComponent],
  imports: [
    CommonModule,
    LazyModuleRoutingModule,
    IconModule,
  ],
})
export class LazyModuleModule {
}
