import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Icon, UrlIcon, XmlIcon } from './meta';

interface RegisteredIcon {
  name: string;
  xml?: string;
  url?: string;
  requested: boolean;
}

/**
 * Icons registry.
 *
 * ```typescript
 * import { IconsRegistry } from '@novyk/ikong';
 * ...
 * constructor(
 *   private iconsRegistry: IconsRegistry,
 * ) {}
 * ...
 * this.iconsRegistry.add({name: 'home', xml: '<svg ...'});
 * this.iconsRegistry.add({name: 'star', url: '/assets/icons/star.svg'});
 * // or
 * this.iconsRegistry.add([
 *   {name: 'home', xml: '<svg ...'},
 *   {name: 'star', url: '/assets/icons/star.svg'},
 * ]);
 * ```
 *
 * Use in a template:
 *
 * ```html
 * <svg icon="home"></svg>
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class IconsRegistry {
  #icons: RegisteredIcon[] = [];

  #reqIcons = new BehaviorSubject<RegisteredIcon[]>([]);

  constructor(
    private http: HttpClient,
    @Optional() @Inject(PLATFORM_ID) private platformId?: any,
  ) {
  }

  get isBrowser() {
    return this.platformId ?
      isPlatformBrowser(this.platformId)
      : typeof document === 'object' && !!document;
  }

  get icons() {
    return [...this.#icons];
  }

  get reqIcons$() {
    return this.#reqIcons.asObservable();
  }

  /**
   * Add icons to registry.
   */
  add(icon: Icon | Icon[]) {
    // @todo filter OR check duplicates
    const icons = Array.isArray(icon) ? icon : [icon];
    this.#icons = [
      ...this.#icons,
      ...icons.map(i => ({
        name: i.name,
        xml: (i as XmlIcon).xml,
        url: (i as UrlIcon).url,
        requested: false,
      })),
    ];
  }

  /**
   * @internal
   *
   * Request icon to load (if needed) and draw into the host.
   */
  req(name: string) {
    const icon = this.#icons.find(i => i.name === name);
    if (!icon) {
      // @todo error/warning ??
      return;
    }
    if (!icon.requested) {
      icon.requested = true;
      if (icon.xml) {
        this.updateReqIcons();
      }
      if (icon.url) {
        this.loadIcon(icon);
      }
    }
  }

  private updateReqIcons() {
    const req = this.#icons.filter(i => i.requested && i.xml);
    if (req.length !== this.#reqIcons.value.length) {
      this.#reqIcons.next(req);
    }
  }

  private loadIcon(icon: RegisteredIcon) {
    if (!icon.url) {
      // @todo warning/error ??
      return;
    }
    return this.http
      .get(icon.url, {responseType: 'text'})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          throw new Error(`Svg load failed, url: ${icon.url}, message: ${error.message}`);
        }),
      )
      .subscribe(xml => {
        icon.xml = xml;
        this.updateReqIcons();
      });
  }
}
