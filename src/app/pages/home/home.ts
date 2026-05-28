import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  public ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }
}


