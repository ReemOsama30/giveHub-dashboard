import { Component } from '@angular/core';
import { ProjectService } from '../../Services/ProjectService/project.service';
import { ChartModule, Chart } from 'angular-highcharts';
import { DonnationService } from '../../Services/donationService/donnation.service';

@Component({
  selector: 'app-chartdashboard',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './chartdashboard.component.html',
  styleUrl: './chartdashboard.component.css'
})
export class ChartdashboardComponent {
 
  constructor(private projectService:ProjectService,
              private donnationService:DonnationService
  ){}

  charityPerformanceChart: Chart = new Chart({});
  projectsChart: Chart = new Chart({});
  donorProjectsMap: { [key: number]: { donorName: string, projectCount: number } } = {};
  moneyDonations: any[] = [];
  inKindDonations: any[] = [];

  projects:any[]=[];
  totalNumberOfProjects:number = 0;
  totalDonations:number=0;
  
  totalMoneyDonations: number = 0;
  totalInKindDonations: number = 0;
  donationChart: Chart = new Chart({});


  ngOnInit() {
    this.loadCharityData();
    this.loadDonationsData();
    
 
  }

  loadCharityData() {
    this.projectService.getProjects().subscribe({
     next: (res: any) => {
        const projects = res.message; 
        console.log("projects here ===> ",projects);
     
        const charityProjectCounts = projects.reduce((accumulator: any, project: any) => {
          const charityId = project.charityId;
          if (!accumulator[charityId]) {
            accumulator[charityId] = {
              charityName: project.charityName,
              projectCount: 0
            };
          }
          accumulator[charityId].projectCount++;
          return accumulator;
        }, {});
  
        const categories = Object.values(charityProjectCounts).map((item: any) => item.charityName);
        const projectCounts = Object.values(charityProjectCounts).map((item: any) => item.projectCount);
  
        this.charityPerformanceChart = new Chart({
          chart: {
            type: 'column'
          },
          title: {
            text: 'Charity Performance'
          },
          xAxis: {
            title: {
            text: 'Charities'
          },
            categories: categories
          },
          yAxis: {
            title: {
              text: 'Number of Projects'
            }
          },
          series: [{ 
            type: 'column',
            name: 'Number of Projects',
            data: projectCounts,
            color: '#4169E1'
          }]
        });
  
        if (projects.length > 0) {
          this.loadProjectsData(projects[0].charityId); 
        }
      },
      error:(err) => {
        console.error('Error fetching projects:', err);
      
      }
  });
  }
  loadProjectsData(charityId: number) {
    
    this.projectService.getAllprojectForCharityId(charityId).subscribe({
     next: projects => {     
      },
      error:(err) => {
        console.error('Error fetching projects:', err);
       
      }
  });
  }


  updateDonorProjectsChart() {

  this.donorProjectsMap = {};


  this.moneyDonations.forEach(donation => {
    const donorId = donation.donorId;
    if (!this.donorProjectsMap[donorId]) {
      this.donorProjectsMap[donorId] = {
        donorName: donation.donorName,
        projectCount: 0
      };
    }
    this.donorProjectsMap[donorId].projectCount++;
  });


  this.inKindDonations.forEach(donation => {
    const donorId = donation.donorId;
    if (!this.donorProjectsMap[donorId]) {
      this.donorProjectsMap[donorId] = {
        donorName: donation.donorName,
        projectCount: 0
      };
    }
    this.donorProjectsMap[donorId].projectCount++;
  });

  const donorNames = Object.values(this.donorProjectsMap).map(item => item.donorName);
  const projectCounts = Object.values(this.donorProjectsMap).map(item => item.projectCount);

 
  this.projectsChart = new Chart({
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Donor Contributions'
    },
    xAxis: {
      categories: donorNames,
      title: {
        text: 'Donors'
      }
    },
    yAxis: {
      title: {
        text: 'Number of Projects'
      }
    },
    series: [{
      type: 'bar',
      name: 'Projects',
      data: projectCounts,
      color: '#E0218A' 
    }]
  });

}




loadDonationsData() {
 
  this.donnationService.getMoneyDonation().subscribe({
    next:(res: any) => {
      this.moneyDonations = res.message;
      console.log('num of projects money donations ==>', this.moneyDonations);
      const numOfProject = res.message.length;
      console.log('number is==>', numOfProject);
      this.calculateTotalMoneyDonations();
      this.updateDonorProjectsChart();
      this.updateDonationChart();
    },
    error:(err) => {
      console.error('Error fetching money donations:', err);
    }
 });


  this.donnationService.getInkindDonation().subscribe({
   next: (res: any) => {
      this.inKindDonations = res.message;
      console.log('num of projects inkind donations ==>', this.inKindDonations);
      const numOfProject = res.message.length;
      console.log('number is==>', numOfProject);
      this.calculateTotalInKindDonations();
      this.updateDonorProjectsChart();
      this.updateDonationChart()
    },
    error:(err) => {
      console.error('Error fetching in-kind donations:', err);
    }
});

  
}

calculateTotalMoneyDonations() {
  this.totalMoneyDonations = this.moneyDonations.reduce((total, donation) => total + donation.amount, 0);
}

calculateTotalInKindDonations() {
  this.totalInKindDonations = this.inKindDonations.reduce((total, donation) => total + donation.quantity, 0);
}

updateDonationChart() {
 
  console.log('Total Money Donations:', this.totalMoneyDonations);
  console.log('Total In-Kind Donations:', this.totalInKindDonations);
  

  this.totalDonations = this.totalMoneyDonations + this.totalInKindDonations;
  const moneyDonationPercentage = this.totalDonations === 0 ? 0 : (this.totalMoneyDonations / this.totalDonations) * 100;
  const inKindDonationPercentage = this.totalDonations === 0 ? 0 : (this.totalInKindDonations / this.totalDonations) * 100;

  console.log('In-Kind Donation Percentage:', inKindDonationPercentage);
  console.log('Money Donation Percentage:', moneyDonationPercentage);

  const data = [
    { name: 'Money Donations', y: moneyDonationPercentage, color: '#4169E1' }, 
    { name: 'In-Kind Donations', y: inKindDonationPercentage, color: '#E0218A' }
  ];


  this.donationChart = new Chart({
    chart: {
      type: 'pie',
     
    },
    title: {
      text: 'Percentage of Donations'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      type: 'pie',
      name: 'Donation Percentage',
      data: data
    }]
  });
}



}
