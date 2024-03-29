import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
    stroke?: string;
    width?: string;
    height?: string;
  }[] = [];

  renders: SafeHtml[] = [];

  constructor(
    private registry: IconsRegistry,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
  ) {
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
          const svgRoot = prepared.match(/^<svg.*?>/)?.[0];
          if (!svgRoot) {
            return undefined;
          }
          return {
            name: icon.name,
            html: prepared
              .replace(/^<svg.*?>/, '')
              .replace(/<\/svg.*?>$/, ''),
            // Match viewBox only from root svg tag
            viewBox: svgRoot.match(/viewBox="(.*?)"/)?.[1],
            fill: svgRoot.match(/fill="(.*?)"/)?.[1],
            stroke: svgRoot.match(/stroke="(.*?)"/)?.[1],
            width: svgRoot.match(/width="(.*?)"/)?.[1],
            height: svgRoot.match(/height="(.*?)"/)?.[1],
          };
        })
        .filter(icon => !!icon);
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
                ${icon.stroke ? `stroke="${icon.stroke}"` : ''}
                ${icon.width ? `width="${icon.width}"` : ''}
                ${icon.height ? `height="${icon.height}"` : ''}
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
