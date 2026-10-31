import { Component } from '@angular/core';

interface Ticket {
  id: string;
  origin: 'Salón' | 'QR' | 'Delivery';
  table: string;
  items: string;
  time: string;
}

/**
 * "Vista conceptual" de Restaurant OS: un tablero de pedidos dibujado con
 * HTML/CSS (no es una captura del producto real, que aún no existe — por eso
 * la etiqueta visible "VISTA CONCEPTUAL"). Datos ficticios de ejemplo.
 * Reemplazar por capturas reales cuando haya MVP (ver docs/PLAN-LANDING-V2.md).
 */
@Component({
  selector: 'app-concept-board',
  templateUrl: './concept-board.component.html',
})
export class ConceptBoardComponent {
  protected readonly columns: { title: string; tone: 'new' | 'kitchen' | 'ready'; tickets: Ticket[] }[] = [
    {
      title: 'Nuevos',
      tone: 'new',
      tickets: [
        { id: '#1042', origin: 'QR', table: 'Mesa 7', items: '1/4 pollo + papas · Chicha 1L', time: '1 min' },
        { id: '#1043', origin: 'Delivery', table: 'Av. Los Héroes', items: '1 pollo entero · Ensalada', time: 'ahora' },
      ],
    },
    {
      title: 'En cocina',
      tone: 'kitchen',
      tickets: [
        { id: '#1039', origin: 'Salón', table: 'Mesa 3', items: 'Pizza familiar americana', time: '9 min' },
        { id: '#1040', origin: 'Delivery', table: 'Jr. Lima 214', items: '1/2 pollo + papas · Gaseosa', time: '6 min' },
      ],
    },
    {
      title: 'Listos',
      tone: 'ready',
      tickets: [{ id: '#1037', origin: 'Salón', table: 'Mesa 1', items: 'Arroz chaufa · Wantán frito', time: '14 min' }],
    },
  ];
}
