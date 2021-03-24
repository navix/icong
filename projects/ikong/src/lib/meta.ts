import { SafeHtml } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

export interface Icon {
  // @todo rename to id ??
  name: string;
  url?: string;
  xml?: string;
  size?: string;
}

export interface IconSource {
  svg: string;
  size?: string;
}

export interface IconCached {
  name: string;
  svg: BehaviorSubject<SafeHtml | null>;
}
