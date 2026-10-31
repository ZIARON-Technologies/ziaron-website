import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';
import { FOOTER_COLUMNS } from '../../data/content.data';

/**
 * Footer global en columnas (marca + Productos / Empresa / Legal).
 * Reglas (ver CLAUDE.md):
 * - Nunca links a páginas que no existen: los items `soon` se muestran
 *   como texto con "Próximamente".
 * - Sin correo/redes/RUC inventados: se agregan cuando existan de verdad.
 */
@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  private readonly themeService = inject(ThemeService);

  protected readonly columns = FOOTER_COLUMNS;
  protected readonly year = new Date().getFullYear();
  protected readonly wordmarkSrc = computed(() =>
    this.themeService.isDark() ? '/brand/logos/ziaron-wordmark-dark.svg' : '/brand/logos/ziaron-wordmark-light.svg',
  );
}
