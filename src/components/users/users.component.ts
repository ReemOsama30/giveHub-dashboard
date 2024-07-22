import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../Services/UserService/users.service';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from '../projects/projects.component';
import AccountType from '../../../enums/AccountType';
import { AccountTypePipe } from '../../Pips/account-type.pipe';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,ProjectsComponent,AccountTypePipe],
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

  getBadgeClass(accountType: AccountType): string {
    if (accountType === 0) {
      return 'admin';
    } else if (accountType === 1) {
      return 'loyal';
    } else {
      return 'team';
    }
  }

  
  getBadgeClassEmail(emailConfirmation:boolean):string{
    return emailConfirmation==true?'active':'inactive'
  }

}
