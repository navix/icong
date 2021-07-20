import { Component, OnInit } from '@angular/core';
import { IconsRegistry } from '@novyk/ikong';
import { bookIcon, dropIcon } from '../../icons';
import { homeIcon } from '../../icons2';

@Component({
  selector: 'app-lazy',
  templateUrl: './lazy.component.html',
  styleUrls: ['./lazy.component.scss'],
})
export class LazyComponent implements OnInit {

  constructor(
    private iconsRegistry: IconsRegistry,
  ) {
    this.iconsRegistry.add([
      bookIcon(),
      homeIcon,
      dropIcon,
    ]);
  }

  ngOnInit(): void {
  }

}
