import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../data/site.config';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

/**
 * /legal/privacidad — Política de privacidad (Ley N.° 29733).
 * IMPORTANTE (ver CLAUDE.md): texto base redactado sin asesoría legal.
 * Antes del lanzamiento: revisarlo con un abogado, completar razón social y
 * RUC al constituir la empresa, y evaluar la inscripción del banco de datos
 * ante la Autoridad Nacional de Protección de Datos Personales.
 */
@Component({
  selector: 'app-privacy',
  imports: [RouterLink, PageHeaderComponent],
  templateUrl: './privacy.component.html',
  styleUrl: './legal-layout.scss',
})
export class PrivacyComponent {
  protected readonly site = SITE;
}
