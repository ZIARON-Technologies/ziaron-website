import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE, whatsappLink } from '../../data/site.config';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { LeadFormComponent } from '../../shared/components/lead-form/lead-form.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

/**
 * /contacto — formulario (variante `contact`) + canales directos. Cada canal
 * solo aparece si está configurado en `SITE` (data/site.config.ts); si no,
 * se muestra "en preparación". Nunca un canal que no responde.
 */
@Component({
  selector: 'app-contact',
  imports: [RouterLink, PageHeaderComponent, LeadFormComponent, RevealDirective],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  protected readonly site = SITE;
  protected readonly waLink = whatsappLink('Hola ZIARON, quisiera más información.');
  protected readonly waDisplay = SITE.whatsapp ? '+' + SITE.whatsapp.replace(/^(\d{2})(\d{3})(\d{3})(\d{3})$/, '$1 $2 $3 $4') : '';
}
