import { Component } from '@angular/core';
import { ThemeService } from '../../Services/themeService/theme.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private themeservice:ThemeService )
  {


  }

  isNightMode: boolean = false;

  toggleMode() {
    this.isNightMode = !this.isNightMode;
    this.setDarkMode(this.isNightMode);
  }

  setDarkMode(isDarkMode: boolean) {
    const section = document.getElementById('section');
    if (section) {
      if (isDarkMode) {
        section.classList.add('dark-theme');
      } else {
        section.classList.remove('dark-theme');
      }
    }
  }
  

}
