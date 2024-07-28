import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-dropdown.component.html',
  styleUrl: './notification-dropdown.component.css'
})
export class NotificationDropdownComponent {
constructor(private router:Router) {
  
}

  @Input() notifications: { message: string, createdAt: string }[] = [];


  handleNotificationClick(notification: any) {
    // Navigate to a detail page or perform any other action
   // this.router.navigate(['/notification-detail', notification.id]);
   console.log("clicked");
  }
  
}
