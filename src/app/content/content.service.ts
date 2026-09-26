import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SiteContent } from './content.model';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly http = inject(HttpClient);

  /** Undefined until assets/content.json has loaded. */
  readonly content = toSignal(this.http.get<SiteContent>('assets/content.json'));
}

/**
 * A link that is only a site root (e.g. "https://github.com/") is a placeholder
 * nobody filled in. Hide it rather than send a visitor to someone's homepage.
 * Relative paths (e.g. "assets/certificate.png") are always real links.
 */
export function isRealLink(url: string | undefined): url is string {
  if (!url) return false;
  try {
    return new URL(url, location.origin).pathname.replace(/\/+$/, '') !== '';
  } catch {
    return false;
  }
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2024-07-01" or "2022-06" -> "Jul 2024". "Present" passes through. */
export function formatMonth(value: string | undefined): string {
  if (!value) return 'Present';
  const m = /^(\d{4})-(\d{2})/.exec(value);
  return m ? `${MONTHS[+m[2] - 1]} ${m[1]}` : value;
}
