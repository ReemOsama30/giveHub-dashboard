import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../Services/UserService/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

   users:any=[];
  constructor(private userService:UsersService)
  {

  }
  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users.message; 
        console.log(this.users); 
      },
      error: (error) => { 
        console.error('Error retrieving users:', error);
      
      }
    });
  }


  getFullImageUrl(relativePath: string): string {
    return `https://localhost:44377${relativePath}`;
  }

  getBadgeClass(accountType: string): string {
    return accountType === 'donor' ? 'loyal' : 'team';


  }


  getBadgeClassEmail(emailConfirmation:boolean):string{
    return emailConfirmation==true?'active':'inactive'
  }

}
