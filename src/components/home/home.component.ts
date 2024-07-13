import { Component } from '@angular/core';
import { ThemeService } from '../../Services/themeService/theme.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatSlideToggleModule,MatIcon],
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
    this.applyTheme(this.isNightMode);
  }

  private applyTheme(isDarkMode: boolean) {
    const containers = document.getElementsByClassName('theme-container');

    for (let i = 0; i < containers.length; i++) {
      const container = containers[i] as HTMLElement;
      if (isDarkMode) {
        container.classList.add('dark-theme');
      } else {
        container.classList.remove('dark-theme');
      }
    }
  }

}
