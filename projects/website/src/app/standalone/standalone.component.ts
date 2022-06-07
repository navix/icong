import { Component } from '@angular/core';
import { IconModule } from 'icong';

@Component({
  selector: 'app-standalone',
  standalone: true,
  imports: [IconModule],
  templateUrl: './standalone.component.html',
  styleUrls: ['./standalone.component.scss'],
})
export class StandaloneComponent {
}
