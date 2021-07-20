import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Icon, IconCached, RegisteredIcon, UrlIcon, XmlIcon } from './meta';

/**
 * Icons registry.
 *
 * ```typescript
 * this.iconsRegistry.add({name: 'star', url: '/assets/icons/star.svg'});
 * // or
 * this.iconsRegistry.add([
 * {name: 'star', url: '/assets/icons/star.svg'},
 * {name: 'cloud', url: '/assets/icons/cloud.svg'},
 * ]);
 * ```
 *
 * Use in a template:
 *
 * ```html
 * <ikong name="star"></ikong>
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

  get reqIcons$() {
    return this.#reqIcons.asObservable();
  }

  /**
   * Add icons to registry.
   */
  add(icon: Icon | Icon[]) {
    const icons = Array.isArray(icon) ? icon : [icon];
    // @todo filter OR check duplicates
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
    // @todo load from URL
    const icon = this.#icons.find(i => i.name === name);
    if (!icon) {
      // @todo error/warning ??
      return;
    }
    if (!icon.requested) {
      icon.requested = true;
      this.updateReqIcons();
    }
  }

  /**
   * Get icon by name.
   *
   * @internal
   */
//  get(name: string): Observable<IconSource> {
//    const icon = this.icons.find(i => i.name === name);
//    if (icon) {
//      // Init cache
//      const fromCache = this.cache.find(c => c.name === name);
//      const cached = fromCache
//        ? fromCache
//        : {
//          name,
//          svg: new BehaviorSubject(null),
//        };
//      if (!fromCache) {
//        // Add cached to the pull
//        this.cache.push(cached);
//        if (icon.url) {
//          if (this.isBrowser) {
//            // Fetch
//            return this.http
//              .get(icon.url, {responseType: 'text'})
//              .pipe(
//                tap(svg => cached.svg.next(svg)),
//                map(svg => ({svg, size: icon.size})),
//                catchError((error: HttpErrorResponse) => {
//                  throw new Error(`Svg load failed, url: ${icon.url}, message: ${error.message}`);
//                }),
//              );
//          } else {
//            return of({svg: ''});
//          }
//        } else if (icon.xml) {
//          // Register xml
//          cached.svg.next(icon.xml);
//        }
//      }
//      // Return stream
//      return cached.svg
//        .asObservable()
//        .pipe(
//          filter(svg => svg !== null),
//          take(1),
//          map((svg: string) => ({
//            svg,
//            size: icon.size,
//          })),
//        );
//    } else {
//      throw new Error(`Icon "${name}" not found!`);
//    }
//  }

  private updateReqIcons() {
    const req = this.#icons.filter(i => i.requested);
    if (req.length !== this.#reqIcons.value.length) {
      console.log('updReqIco', req);
      this.#reqIcons.next(req);
    }
  }
}
