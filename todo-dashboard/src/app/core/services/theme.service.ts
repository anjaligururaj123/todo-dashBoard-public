import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';
export type Layout = 'compact' | 'comfortable';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'app-theme';
  private readonly LAYOUT_KEY = 'app-layout';
  private isBrowser: boolean;

  private themeSubject = new BehaviorSubject<Theme>(this.getStoredTheme());
  private layoutSubject = new BehaviorSubject<Layout>(this.getStoredLayout());

  theme$ = this.themeSubject.asObservable();
  layout$ = this.layoutSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    if (this.isBrowser) {
      this.applyTheme(this.themeSubject.value);
    }
  }

  toggleTheme(): void {
    const newTheme = this.themeSubject.value === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    
    if (this.isBrowser) {
      localStorage.setItem(this.THEME_KEY, theme);
      this.applyTheme(theme);
    }
  }

  setLayout(layout: Layout): void {
    this.layoutSubject.next(layout);
    
    if (this.isBrowser) {
      localStorage.setItem(this.LAYOUT_KEY, layout);
    }
  }

  private getStoredTheme(): Theme {
    if (this.isBrowser) {
      return (localStorage.getItem(this.THEME_KEY) as Theme) || 'light';
    }
    return 'light';
  }

  private getStoredLayout(): Layout {
    if (this.isBrowser) {
      return (localStorage.getItem(this.LAYOUT_KEY) as Layout) || 'comfortable';
    }
    return 'comfortable'; 
  }

  private applyTheme(theme: Theme): void {
    if (this.isBrowser) {
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(theme);
    }
  }
}