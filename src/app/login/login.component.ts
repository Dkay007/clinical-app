import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, tap } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { from } from 'rxjs';
import { DataProviderService } from '../services/data-provider.service';
import { ErrorResponse } from '../models/error-response';
import { SessionToken } from '../models/session-token';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loading: boolean = false;
  public error: string = '';

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
  }

  get form() { return this.loginForm.controls; }

  onSubmit() {      
      if (this.loginForm.invalid) {
          return;
      }
      this.loading = true;
      this.authenticationService.login(this.form.username.value, this.form.password.value).pipe(
            first(),
            tap((status: any)=> {
                if(status.sessionToken){
                    const token: SessionToken = status;
                    this.authenticationService.currentTokenChanged(token.sessionToken);
                } else if (status.errorMessage){
                    const error: ErrorResponse = status;
                    throw new Error(error.errorMessage);
                }                
            })).subscribe(
                () => {                
                    this.router.navigate(['/']);
                },
                error => {
                    this.error = error;
                    this.loading = false;
            });
                 
  }
}