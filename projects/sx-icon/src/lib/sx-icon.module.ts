import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SxIconComponent } from './sx-icon.component';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  declarations: [
    SxIconComponent,
  ],
  exports: [
    SxIconComponent,
  ],
})
export class SxIconModule {
}
