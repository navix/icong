import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconsRegistry } from '../icons-registry';
import { Icon } from '../meta';

@Component({
  selector: 'icons-host',
  templateUrl: './icons-host.component.html',
  styleUrls: ['./icons-host.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconsHostComponent implements OnInit {
  icons?: {
    orig: Icon;
    html: SafeHtml;
    viewBox?: string;
    fill?: string;
  }[];

  constructor(
    private registry: IconsRegistry,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
  ) {
  }

  ngOnInit() {
    this.registry
      .icons$
      .subscribe(icons => {
        this.icons = icons.map(icon => {
          const prepared = icon.xml
            .trim()
            .replace(/(\r\n|\n|\r)/gm, '');
          return {
            orig: icon,
            html: this.sanitizer.bypassSecurityTrustHtml(prepared
              .replace(/^<svg.*?>/, '')
              .replace(/<\/svg.*?>$/, ''),
            ),
            viewBox: prepared.match(/^<svg.*?viewBox="(.*?)".*?>/)?.[1],
            fill: prepared.match(/^<svg.*?fill="(.*?)".*?>/)?.[1],
          };
        });
        this.cdr.markForCheck();
      });
  }
}
