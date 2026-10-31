import { DOCUMENT, Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeMode } from '../../models/theme.model';

const THEME_STORAGE_KEY = 'ziaron-theme';

/**
 * Maneja el tema (claro / oscuro / automático) de toda la app.
 *
 * - Persiste la elección del usuario en localStorage.
 * - En modo "auto" sigue a `prefers-color-scheme` del sistema, incluso si
 *   el usuario lo cambia en caliente (escucha el evento `change`).
 * - Aplica el tema como clase `.dark` en `<html>` (ver
 *   `@custom-variant dark` en `src/tailwind.css`).
 * - El `<script>` inline en `index.html` hace lo mismo de forma síncrona
 *   antes de que Angular arranque, para evitar parpadeo (FOUC). Si cambia
 *   la lógica acá, hay que reflejarla ahí también.
 * - SSR/SSG-safe: durante el prerender (Node) no existen `window` ni
 *   `localStorage`, así que todo acceso al navegador va detrás de
 *   `isBrowser`. En el servidor el tema queda en 'auto' / claro; el script
 *   inline de index.html corrige la clase antes del primer pintado.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /** IMPORTANTE: debe declararse antes de `theme`/`isDark` — los field
   * initializers corren en orden de declaración y ambos dependen de esto.
   * `typeof` check: jsdom (tests) no implementa matchMedia. */
  private readonly media =
    this.isBrowser && typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  readonly theme = signal<ThemeMode>(this.readStoredTheme());

  /** Tema resuelto (true = oscuro). Lo usan los componentes que eligen un
   * asset distinto por tema (ej. el SVG del wordmark). */
  readonly isDark = signal<boolean>(this.computeIsDark());

  constructor() {
    this.media?.addEventListener('change', () => {
      if (this.theme() === 'auto') this.applyTheme();
    });

    effect(() => {
      this.theme();
      this.applyTheme();
    });
  }

  setTheme(mode: ThemeMode): void {
    this.theme.set(mode);
    if (this.isBrowser) localStorage.setItem(THEME_STORAGE_KEY, mode);
  }

  private readStoredTheme(): ThemeMode {
    if (!this.isBrowser) return 'auto';
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'light' || stored === 'dark' || stored === 'auto' ? stored : 'auto';
  }

  private applyTheme(): void {
    if (!this.isBrowser) return;
    const isDark = this.computeIsDark();
    this.document.documentElement.classList.toggle('dark', isDark);
    this.isDark.set(isDark);
  }

  private computeIsDark(): boolean {
    const mode = this.theme();
    return mode === 'dark' || (mode === 'auto' && !!this.media?.matches);
  }
}
