import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { UsersComponent } from '../components/users/users.component';
import { HomeComponent } from '../components/home/home.component';
import { RegisterComponent } from '../components/register/register.component';
import { ProjectsComponent } from '../components/projects/projects.component';

export const routes: Routes = [
{path:"",redirectTo:"home", pathMatch: 'full'},
{path:"login",component:LoginComponent},
{path:"users",component:UsersComponent},
{path:"home",component:HomeComponent},
{path:"registeration",component:RegisterComponent},
{path:"projects",component:ProjectsComponent}
];
