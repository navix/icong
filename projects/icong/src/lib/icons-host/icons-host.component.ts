import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { debounceTime } from 'rxjs';
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

  renders: SafeHtml[] = [];

  constructor(
    private registry: IconsRegistry,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) platformId: any,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.registry.reqIcons$.pipe(debounceTime(0)).subscribe(icons => {
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
            html: prepared
              .replace(/^<svg.*?>/, '')
              .replace(/<\/svg.*?>$/, ''),
            viewBox: prepared.match(/^<svg.*?viewBox="(.*?)".*?>/)?.[1],
            fill: prepared.match(/^<svg.*?fill="(.*?)".*?>/)?.[1],
          };
        });
      this.renders.push(this.sanitizer.bypassSecurityTrustHtml(`
        <svg
          height="200"
          style="display: none;"
          viewBox="0 0 500 200"
          width="500"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            ${newIcons.map(icon => `
              <symbol
                id="${icon.name}"
                ${icon.viewBox ? `viewBox="${icon.viewBox}"` : ''}
                ${icon.fill ? `fill="${icon.fill}"` : ''}
              >
                ${icon.html}
              </symbol>
            `).join('')}
          </defs>
        </svg>
      `));
      this.icons.push(...newIcons);
      this.cdr.markForCheck();
    });
  }

  trackByFn(
    index,
  ) {
    return index;
  }
}
