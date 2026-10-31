import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';

/** Contenedor de toasts (en app.html). `aria-live` para lectores de pantalla. */
@Component({
  selector: 'app-toast',
  template: `
    <div class="pointer-events-none fixed bottom-5 left-5 right-5 z-50 flex flex-col items-start gap-3 sm:bottom-8 sm:left-8 sm:right-auto" aria-live="polite" role="status">
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          class="toast pointer-events-auto flex w-full max-w-[380px] items-start gap-3 rounded-xl border bg-bg-elevated p-4"
          [class]="toast.kind === 'error' ? 'border-[rgba(239,68,68,0.4)]' : 'border-accent-border'"
          style="box-shadow: var(--shadow-panel)"
        >
          <span
            class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
            [class]="toast.kind === 'error' ? 'bg-[rgba(239,68,68,0.15)] text-[#ef4444]' : 'bg-accent-bg text-accent-text'"
          >
            @if (toast.kind === 'error') {
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 7v6M12 17h.01" /></svg>
            } @else {
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
            }
          </span>
          <div class="flex flex-1 flex-col gap-1">
            <span class="text-[14px] font-medium text-text">{{ toast.title }}</span>
            @if (toast.message) {
              <span class="text-[13px] leading-[1.5] text-text-muted">{{ toast.message }}</span>
            }
          </div>
          <button type="button" (click)="toastService.dismiss(toast.id)" class="rounded text-text-dim outline-none hover:text-text focus-visible:ring-2 focus-visible:ring-accent" aria-label="Cerrar notificación">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>
      }
    </div>
  `,
  styles: `
    .toast { animation: toast-in 0.25s ease-out; }
    @keyframes toast-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
  `,
})
export class ToastComponent {
  protected readonly toastService = inject(ToastService);
}
