import { Component } from '@angular/core';
import { IconsRegistry } from '@novyk/ikong';
import { menuIcon } from './icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private iconsRegistry: IconsRegistry,
  ) {
    this.iconsRegistry.add(menuIcon());
    this.iconsRegistry.add({
      name: 'lock',
      url: '/assets/lock.svg',
    });
  }
}
