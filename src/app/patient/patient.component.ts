import { Component, Input, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Common } from '../libraries/common';
import { AuthenticationService } from '../services/authentication.service';
import { DataProviderService } from '../services/data-provider.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  @Input()
  id: string;

  public patientDetail$: Observable<Array<string>>;
  constructor(
    private authenticationService: AuthenticationService,
    private dataProviderService: DataProviderService
    )  { }

  ngOnInit(): void {
      this.patientDetail$ = this.getPatientDetail$(this.authenticationService.token$).pipe(map((patient)=> {
        return  Object.entries(patient).map( ([key, val]) => {
            return `${Common.capitalizeFirstLetter(Common.breakCamelCase(key))}: ${val}`;
          });
      }));
  }

  public getPatientDetail$(token$: Observable<string>){
      return token$.pipe(switchMap((token: string) => {
        return from(this.dataProviderService.getData(`/patient-details/${this.id}`, token));
      }))
  }
}
