import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService
  ) {}

  addUser() {
    //Validate inputs
    if (
      this.username == '' ||
      this.password == '' ||
      this.confirmPassword == ''
    ) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }
    //validate passwords
    if (this.password != this.confirmPassword) {
      this.toastr.error('Las passwords ingresadas no coinciden');
      return;
    }

    const user: User = {
      username: this.username,
      password: this.password,
      
    };
    this._userService.signIn(user).subscribe({
      next: (v) => {
        this.loading = false;
        this.toastr.success(
          `El usuario ${this.username} se creo correctamente`,
          'Usuario Registrado'
        );
        this.router.navigate(['/login']);
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msjError(e)
      }
    });
    
  }

  
}
