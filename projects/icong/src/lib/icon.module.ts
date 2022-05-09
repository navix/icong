import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { IconComponent } from './icon/icon.component';
import { IconsHostComponent } from './icons-host/icons-host.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [
    IconComponent,
    IconsHostComponent,
  ],
  exports: [
    IconComponent,
    IconsHostComponent,
  ],
})
export class IconModule {
}
