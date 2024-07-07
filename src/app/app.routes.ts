import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { UsersComponent } from '../components/users/users.component';
import { HomeComponent } from '../components/home/home.component';
import { RegisterComponent } from '../components/register/register.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { ChartdashboardComponent } from '../components/chartdashboard/chartdashboard.component';
import { authGuard } from '../guards/auth/auth.guard';


export const routes: Routes = [
{path:"",redirectTo:"home", pathMatch: 'full'},
{path:"users",component:UsersComponent, canActivate:[authGuard]},
{path:"home",component:HomeComponent , canActivate: [authGuard]},
{path:"projects",component:ProjectsComponent, canActivate: [authGuard]},
{path:"charts",component:ChartdashboardComponent, canActivate: [authGuard]},

{path:"login",component:LoginComponent},
{path:"registeration",component:RegisterComponent},


];
