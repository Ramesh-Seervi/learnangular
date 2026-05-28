import { Component, signal, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  protected readonly isSubmitting = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  protected readonly loginForm = new FormGroup({
    email: new FormControl('admin@example.com', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('password123', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)]
    })
  });

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  public ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }


  protected onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    // Simulate login API call
    setTimeout(() => {
      const { email, password } = this.loginForm.value;
      
      // Simulating a successful login for any valid email/password
      if (email === 'admin@example.com' && password === 'password123') {
        this.authService.login();
        this.isSubmitting.set(false);
        this.router.navigate(['/dashboard']);
      } else {
        this.isSubmitting.set(false);
        this.errorMessage.set('Invalid credentials. Use admin@example.com / password123');
      }
    }, 1000);
  }
}



