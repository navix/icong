import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, filter, map, take, tap } from 'rxjs/operators';
import { SxIcon, SxIconCached, SxIconSource } from './meta';

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
 * Use in a template
 *
 * ```html
 * <sx-icon name="star"></sx-icon>
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class SxIconsRegistry {
  private cache: SxIconCached[] = [];

  private icons: SxIcon[] = [];

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

  /**
   * Add icons to registry.
   */
  add(icon: SxIcon | SxIcon[]) {
    const icons = Array.isArray(icon) ? icon : [icon];
    // Validate
    icons.forEach(i => {
      if (!i.url && !i.xml) {
        throw new Error('KitIconsRegistryService: icon registration requires url or xml.');
      }
    });
    // Merge
    this.icons = [...this.icons, ...icons];
  }

  /**
   * Get icon by name.
   *
   * @internal
   */
  get(name: string): Observable<SxIconSource> {
    const icon = this.icons.find(i => i.name === name);
    if (icon) {
      // Init cache
      const fromCache = this.cache.find(c => c.name === name);
      const cached = fromCache
        ? fromCache
        : {
          name,
          svg: new BehaviorSubject(null),
        };
      if (!fromCache) {
        // Add cached to the pull
        this.cache.push(cached);
        if (icon.url) {
          if (this.isBrowser) {
            // Fetch
            return this.http
              .get(icon.url, {responseType: 'text'})
              .pipe(
                tap(svg => cached.svg.next(svg)),
                map(svg => ({svg, size: icon.size})),
                catchError((error: HttpErrorResponse) => {
                  throw new Error(`Svg load failed, url: ${icon.url}, message: ${error.message}`);
                }),
              );
          } else {
            return of({svg: ''});
          }
        } else if (icon.xml) {
          // Register xml
          cached.svg.next(icon.xml);
        }
      }
      // Return stream
      return cached.svg
        .asObservable()
        .pipe(
          filter(svg => svg !== null),
          take(1),
          map((svg: string) => ({svg, size: icon.size})),
        );
    } else {
      throw new Error(`Icon "${name}" not found!`);
    }
  }
}
