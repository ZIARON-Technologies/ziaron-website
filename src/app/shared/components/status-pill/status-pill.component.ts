import { Component, input } from '@angular/core';

/**
 * Pill de estado: punto + texto mono uppercase, borde/fondo de acento tenue
 * (ej. "EN CONSTRUCCIÓN"). `tone="muted"` para estados no activos
 * (ej. "PRÓXIMAMENTE"). Antes estaba duplicado a mano en header y hero.
 */
@Component({
  selector: 'app-status-pill',
  template: `
    <span
      class="inline-flex items-center gap-2 rounded-full border py-1 pl-2.5 pr-3"
      [class]="tone() === 'accent' ? 'border-accent-border bg-accent-bg text-accent-text' : 'border-border bg-bg-elevated text-text-dim'"
    >
      <span
        class="block h-1.5 w-1.5 rounded-full"
        [class]="tone() === 'accent' ? 'bg-accent-text' : 'bg-text-dim'"
        [style.box-shadow]="tone() === 'accent' ? '0 0 0 3px var(--accent-bg)' : null"
      ></span>
      <span class="font-mono text-[10px] font-medium uppercase tracking-[0.08em] sm:text-[10.5px]">{{ label() }}</span>
    </span>
  `,
  styles: `:host { display: inline-flex; }`,
})
export class StatusPillComponent {
  readonly label = input.required<string>();
  readonly tone = input<'accent' | 'muted'>('accent');
}
