import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../Services/ProjectService/project.service';
import {Project} from '../../../Interfaces/project'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {

  constructor (private _ProjectService:ProjectService){}
  
  charityProjects: { [key: string]: Project[] } = {}; 

  ngOnInit(): void {
    this._ProjectService.getProjects().subscribe({
      next: (res) => {
        console.log('Response:', res);
        if (res && res.message && Array.isArray(res.message)) {
          res.message.forEach((proj: Project) => {
            if (proj.charityName) {
              if (!this.charityProjects[proj.charityName]) {
                this.charityProjects[proj.charityName] = [];
              }
              this.charityProjects[proj.charityName].push(proj);
            }
          });

          console.log('Charity Projects:', this.charityProjects);
        } else {
          console.error('Unexpected response:', res);
        }
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  getCharityNames(): string[] {
    return Object.keys(this.charityProjects);
  }
  
}
