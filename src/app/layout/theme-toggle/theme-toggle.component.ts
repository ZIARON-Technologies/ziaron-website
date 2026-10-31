import { Component, inject } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { ThemeMode } from '../../models/theme.model';

@Component({
  selector: 'app-theme-toggle',
  imports: [],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss'
})
export class ThemeToggleComponent {
  protected readonly themeService = inject(ThemeService);

  protected setTheme(mode: ThemeMode): void {
    this.themeService.setTheme(mode);
  }
}
