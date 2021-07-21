import { Component, OnInit } from '@angular/core';
import { IconsRegistry } from '../../../../../ikong/src/lib/icons-registry';
import { trashIcon } from '../../icons';

@Component({
  selector: 'app-lazy2',
  templateUrl: './lazy2.component.html',
  styleUrls: ['./lazy2.component.scss']
})
export class Lazy2Component implements OnInit {
  iter = new Array(1999);

  constructor(
    private ir: IconsRegistry,
  ) {
    this.ir.add(trashIcon);
  }

  ngOnInit(): void {
  }

}
