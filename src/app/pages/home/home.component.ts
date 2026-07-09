import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';

/**
 * Página "Home": compone el contenido principal de la SPA (todo lo que
 * va dentro de <main>, fuera de header/footer). Hoy solo muestra el hero;
 * cuando se reactiven Ecosistema, Principios y Hoja de ruta (ver
 * CLAUDE.md), sus componentes se agregan acá, no en app.html.
 */
@Component({
  selector: 'app-home',
  imports: [HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}
