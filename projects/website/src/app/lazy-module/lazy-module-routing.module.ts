import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LazyUrlComponent } from './lazy-url/lazy-url.component';
import { LazyComponent } from './lazy/lazy.component';
import { Lazy2Component } from './lazy2/lazy2.component';

const routes: Routes = [
  {
    path: 'lazy1',
    component: LazyComponent,
  },
  {
    path: 'lazy2',
    component: Lazy2Component,
  },
  {
    path: 'lazy-url',
    component: LazyUrlComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LazyModuleRoutingModule {
}
