import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

/** Título de pestaña por ruta: "<título de la ruta> · ZIARON Technologies".
 * El home usa el formato inverso (marca primero). Meta description y Open
 * Graph por página quedan para la Fase 6 (ver docs/PLAN-LANDING-V2.md). */
@Injectable({ providedIn: 'root' })
export class ZiaronTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const pageTitle = this.buildTitle(snapshot);
    const isHome = snapshot.url === '/' || snapshot.url.startsWith('/#');
    this.title.setTitle(
      !pageTitle ? 'ZIARON Technologies' : isHome ? `ZIARON Technologies — ${pageTitle}` : `${pageTitle} · ZIARON Technologies`,
    );
  }
}
