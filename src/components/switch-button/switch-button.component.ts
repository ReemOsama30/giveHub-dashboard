import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-switch-button',
  standalone: true,
  imports: [MatSlideToggleModule,MatIconModule],
  templateUrl: './switch-button.component.html',
  styleUrl: './switch-button.component.css'
})
export class SwitchButtonComponent {
  isNightMode: boolean = false;

  toggleMode() {
    this.isNightMode = !this.isNightMode;
    document.body.classList.toggle('dark-theme', this.isNightMode);
    document.body.classList.toggle('light-theme', !this.isNightMode);
  }
  }

