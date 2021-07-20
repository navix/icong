import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconsRegistry } from '../icons-registry';

@Component({
  selector: 'icons-host',
  templateUrl: './icons-host.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconsHostComponent implements OnInit {
  icons: {
    name: string;
    html: SafeHtml;
    viewBox?: string;
    fill?: string;
  }[] = [];

  constructor(
    private registry: IconsRegistry,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
  ) {
  }

  ngOnInit() {
    this.registry
      .reqIcons$
      .subscribe(icons => {
        const newIcons = icons
          // Add only new icons
          .filter(icon => !this.icons.find(localIcon => localIcon.name === icon.name))
          // Map to local obj
          .map(icon => {
            const prepared = icon.xml
              .trim()
              .replace(/(\r\n|\n|\r)/gm, '');
            return {
              name: icon.name,
              html: this.sanitizer.bypassSecurityTrustHtml(prepared
                .replace(/^<svg.*?>/, '')
                .replace(/<\/svg.*?>$/, ''),
              ),
              viewBox: prepared.match(/^<svg.*?viewBox="(.*?)".*?>/)?.[1],
              fill: prepared.match(/^<svg.*?fill="(.*?)".*?>/)?.[1],
            };
          });
        console.log('PUSH', newIcons);
        this.icons.push(...newIcons);
        this.cdr.markForCheck();
      });
  }

  trackByFn(index, item: {name: string}) {
    return item.name;
  }
}
