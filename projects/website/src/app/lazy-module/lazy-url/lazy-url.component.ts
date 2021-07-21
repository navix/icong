import { Component, OnInit } from '@angular/core';
import { IconsRegistry } from '../../../../../ikong/src/lib/icons-registry';

@Component({
  selector: 'app-lazy-url',
  templateUrl: './lazy-url.component.html',
  styleUrls: ['./lazy-url.component.scss']
})
export class LazyUrlComponent implements OnInit {

  constructor(
    private ir: IconsRegistry,
  ) { }

  ngOnInit(): void {
    this.ir.add([
      { name: 'layout', url: '/assets/layout.svg' },
      { name: 'sa', url: '/assets/sunrise-alt.svg' },
    ]);
  }

}
