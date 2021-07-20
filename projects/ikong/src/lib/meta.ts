import { SafeHtml } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

export type Icon = XmlIcon | UrlIcon;

export interface XmlIcon {
  name: string;
  xml: string;
}

export interface UrlIcon {
  name: string;
  url: string;
}

export interface RegisteredIcon {
  name: string;
  xml?: string;
  url?: string;
  requested: boolean;
}

/**
 * @internal
 */
export interface IconCached {
  name: string;
  svg: BehaviorSubject<SafeHtml | null>;
}
