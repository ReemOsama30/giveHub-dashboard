import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../Services/themeService/theme.service';
@Component({
  selector: 'app-switch-button',
  standalone: true,
  imports: [MatSlideToggleModule,MatIconModule],
  templateUrl: './switch-button.component.html',
  styleUrl: './switch-button.component.css'
})
export class SwitchButtonComponent {
  isDarkMode: boolean;

  constructor(private themeService: ThemeService) {
    this.isDarkMode = this.themeService.isDarkMode();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }
  }

