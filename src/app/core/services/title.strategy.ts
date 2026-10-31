import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { SITE } from '../../data/site.config';

const DEFAULT_DESCRIPTION =
  'ZIARON Technologies. Ingeniería de plataformas SaaS, inteligencia artificial, automatización e infraestructura cloud.';
const OG_IMAGE = `${SITE.url}/brand/social/og-ziaron.png`;

/**
 * SEO por ruta, en un solo lugar (corre en cada navegación Y durante el
 * prerender, así el HTML estático ya trae todo):
 * - <title>: "<título> · ZIARON Technologies" (home: "ZIARON Technologies — ...").
 * - meta description: `data.description` de la ruta.
 * - Open Graph + Twitter card (vista previa al compartir en WhatsApp/LinkedIn).
 * - <link rel="canonical"> con la URL limpia (sin #ancla ni query).
 * - `data.noindex: true` → robots noindex (404).
 */
@Injectable({ providedIn: 'root' })
export class ZiaronTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const pageTitle = this.buildTitle(snapshot);
    const path = snapshot.url.split(/[?#]/)[0] || '/';
    const isHome = path === '/';
    const fullTitle = !pageTitle
      ? SITE.name
      : isHome
        ? `${SITE.name} — ${pageTitle}`
        : `${pageTitle} · ${SITE.name}`;

    const data = this.deepestData(snapshot.root);
    const description = (data['description'] as string | undefined) ?? DEFAULT_DESCRIPTION;
    const url = SITE.url + (isHome ? '/' : path);

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: data['noindex'] ? 'noindex, nofollow' : 'index, follow' });

    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: SITE.name });
    this.meta.updateTag({ property: 'og:locale', content: 'es_PE' });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: OG_IMAGE });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: OG_IMAGE });

    this.setCanonical(url);
  }

  private deepestData(route: ActivatedRouteSnapshot): Record<string, unknown> {
    let current = route;
    while (current.firstChild) current = current.firstChild;
    return current.data ?? {};
  }

  private setCanonical(url: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
