import { Pipe, PipeTransform } from '@angular/core';
import AccountType from '../../enums/AccountType';

@Pipe({
  name: 'accountType',
  standalone: true
})
export class AccountTypePipe implements PipeTransform {

 
    transform(value: AccountType): string {
      switch (value) {
          case AccountType.Admin:
              return 'Administrator';
          case AccountType.Charity:
              return 'Charity';
          case AccountType.Donor:
              return 'Donor';
          default:
              return 'Unknown';
      
  }

    }}
