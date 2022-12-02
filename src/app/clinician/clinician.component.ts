import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Clinician } from '../models/clinician';
import { Patient } from '../models/patient';
import { AuthenticationService } from '../services/authentication.service';
import { DataProviderService } from '../services/data-provider.service';

@Component({
  selector: 'app-clinician',
  templateUrl: './clinician.component.html',
  styleUrls: ['./clinician.component.css']
})
export class ClinicianComponent implements OnInit {
  public clinicianDetail$: Observable<string>;
  public patients$: Observable<Array<Patient>>;
  constructor(
    private authenticationService: AuthenticationService,
    private dataProviderService: DataProviderService
    ){ }

  ngOnInit(): void {
    this.clinicianDetail$ = this.getClinicianDetail$(this.authenticationService.token$);
    this.patients$ = this.getPatients$(this.authenticationService.token$);
  }

  public getClinicianDetail$(token$: Observable<string>): Observable<string>{
      return token$.pipe(switchMap((token)=> from(this.dataProviderService.getData('/clinician-details', token))), map((clinician: Clinician)=> {
            if(clinician.preferredName){
              return [clinician.title, clinician.preferredName, clinician.firstName, clinician.middleName, clinician.familyName, clinician.suffix].join(' ') + "(" + clinician.role + ")";
            }
            return [clinician.title, clinician.firstName, clinician.middleName, clinician.familyName, clinician.suffix].join(' ') + "(" + clinician.role + ")";
      }));
  }

  public getPatients$(token$: Observable<string>): Observable<any> {
    return token$.pipe(switchMap((token: string) => {
      return from(this.dataProviderService.getData('/patients', token));
    }))
  }

  public logout() {
    this.authenticationService.logout();
}


}
