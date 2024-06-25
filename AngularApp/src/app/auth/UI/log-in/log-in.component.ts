import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {AuthService} from "../../core/auth.service";
import {AuthRequest} from "../../interface/authRequest.interface";

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf,
    FormsModule
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent{

  authService = inject(AuthService);
  error: string = '';
  router = inject(Router);
  isPasswordVisible = signal<boolean>(false);

  form = new FormGroup({
    email: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required)
 })

  onSubmit(){
    if(this.form.valid){
      // console.log(this.form.value)
      this.authService.login(<AuthRequest>this.form.value)
        .subscribe(res => {
          this.router.navigate([''])
          console.log(res);
        },
          error => {
          this.error = "Unauthorized"
          })
    }
    else {
      this.error = "Form invalid"
      // console.log("Form invalid")
    }

  }

}



