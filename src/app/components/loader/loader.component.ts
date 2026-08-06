import { Component, OnInit, signal } from '@angular/core';

/** Paleta de marca (ver ZIARON_Foundation / branding-assets) usada para los
 * anillos "Nexus" del loader. Se elige un color al azar por anillo en cada
 * carga de página, a pedido explícito del usuario. */
const RING_PALETTE = ['#8B5CF6', '#6366F1', '#4F7FFF', '#06B6D4'];

function randomRingColor(exclude?: string): string {
  const options = exclude ? RING_PALETTE.filter((c) => c !== exclude) : RING_PALETTE;
  return options[Math.floor(Math.random() * options.length)];
}

/**
 * Overlay de carga inicial mostrado al entrar a la página. Usa el isotipo
 * ("Z") definitivo con una animación de trazo (stroke-draw) en loop, el
 * núcleo Nexus pulsando, y dos anillos que se expanden desde el Nexus hacia
 * los nodos de las esquinas (efecto "radar" / sonar) — colores tomados al
 * azar de la paleta de marca en cada carga.
 *
 * Theme-adaptive: los "hoyos" de los nodos usan `var(--bg)`, así que siguen
 * el tema activo (ThemeService ya aplica `.dark` en <html> antes de que
 * Angular arranque).
 *
 * Se autodestruye tras un tiempo mínimo de exhibición (ver
 * loader.component.scss para el timing del fade-out) — no depende de ningún
 * evento de carga real, porque hoy la página es estática; si en el futuro
 * hay datos async que cargar, reemplazar el setTimeout por la señal de
 * "listo" real.
 */
@Component({
  selector: 'app-loader',
  standalone: true,
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent implements OnInit {
  visible = signal(true);
  hidden = signal(false);

  readonly ringColor1 = randomRingColor();
  readonly ringColor2 = randomRingColor(this.ringColor1);

  ngOnInit(): void {
    const MIN_DISPLAY_MS = 900;
    const FADE_OUT_MS = 500;

    setTimeout(() => {
      this.hidden.set(true);
      setTimeout(() => this.visible.set(false), FADE_OUT_MS);
    }, MIN_DISPLAY_MS);
  }
}
