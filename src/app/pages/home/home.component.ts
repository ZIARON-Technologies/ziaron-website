import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { AboutComponent } from '../../components/about/about.component';
import { MissionComponent } from '../../components/mission/mission.component';
import { ValuesComponent } from '../../components/values/values.component';
import { CapabilitiesComponent } from '../../components/capabilities/capabilities.component';
import { SystemStatusComponent } from '../../components/system-status/system-status.component';
import { ContactComponent } from '../../components/contact/contact.component';

/**
 * Página "Home": compone el contenido principal de la SPA (todo lo que va
 * dentro de <main>, fuera de header/footer). Muestra, en orden: hero,
 * "Quiénes somos" (Nosotros), "Misión", "Valores" (Principios reactivados),
 * "Qué hacemos" (Ecosistema), panel Nexus y "Contacto" — este orden coincide
 * con el nav del header. Misión y Contacto son texto placeholder a pedido
 * explícito del usuario (ver comentarios en cada componente); Valores usa
 * datos reales (PRINCIPLES). Hoja de ruta sigue sin activarse (ver CLAUDE.md).
 */
@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    AboutComponent,
    MissionComponent,
    ValuesComponent,
    CapabilitiesComponent,
    SystemStatusComponent,
    ContactComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
