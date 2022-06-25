import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
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

  isBrowser = false;

  constructor(
    private registry: IconsRegistry,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) platformId: any,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (!this.isBrowser) {
      return;
    }
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
        this.icons.push(...newIcons);
        this.cdr.markForCheck();
      });
  }

  trackByFn(
    index,
    item: {name: string},
  ) {
    return item.name;
  }
}
