import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  login!: string;
  password!: string;
  formData!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.formData = new FormGroup({
      login: new FormControl('login'),
      password: new FormControl('password'),
    });
  }

  onSubmit(event: any, data: { login: string; password: string }) {
    event.preventDefault();
    this.login = data.login;
    this.password = data.password;

    console.log('Login page: ' + this.login);
    console.log('Login page: ' + this.password);

    this.authService.login(this.login, this.password).subscribe((data) => {
    });
  }
}
