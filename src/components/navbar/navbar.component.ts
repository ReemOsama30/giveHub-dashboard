import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Services/authService/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; 
import { SwitchButtonComponent } from '../switch-button/switch-button.component';
import { NotificationDropdownComponent } from '../notification-dropdown/notification-dropdown.component';
import { NotificationService } from '../../Services/NotificationService/notification.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,FormsModule,CommonModule ,MatSlideToggleModule,SwitchButtonComponent,NotificationDropdownComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn = false;
  notifications:any=[];
  constructor( private _auth:AuthService,private notificationService:NotificationService)
  {

  }

  ngOnInit() {

    this.notificationService.getAllNotifications().subscribe(
      {
        next: (noti) => {
          this.notifications = noti.message; 
          console.log(this.notifications); 
        },
        error: (error) => { 
          console.error('Error retrieving notifications:', error);
        
        }
      }
    
    );

    
    this._auth.isLoggedIn.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  logout()
{
  this.isLoggedIn=false;
  this._auth.logOut();

}

}
