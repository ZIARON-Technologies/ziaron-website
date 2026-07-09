import { Injectable, effect, signal } from '@angular/core';
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
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<ThemeMode>(this.readStoredTheme());

  private readonly media = window.matchMedia('(prefers-color-scheme: dark)');

  constructor() {
    this.media.addEventListener('change', () => {
      if (this.theme() === 'auto') this.applyTheme();
    });

    effect(() => {
      this.theme();
      this.applyTheme();
    });
  }

  setTheme(mode: ThemeMode): void {
    this.theme.set(mode);
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  }

  private readStoredTheme(): ThemeMode {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'light' || stored === 'dark' || stored === 'auto' ? stored : 'auto';
  }

  private applyTheme(): void {
    const mode = this.theme();
    const isDark = mode === 'dark' || (mode === 'auto' && this.media.matches);
    document.documentElement.classList.toggle('dark', isDark);
  }
}
