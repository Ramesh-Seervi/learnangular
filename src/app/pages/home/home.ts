import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { UpperCasePipe, CurrencyPipe, DatePipe } from '@angular/common';
import { AuthService } from '../../auth.service';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-home',
  imports: [RouterLink, HighlightDirective, UpperCasePipe, CurrencyPipe, DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  // Writable signals for interactive pipe demonstrations
  protected readonly demoText = signal('learn angular');
  protected readonly demoPrice = signal(1249.99);
  protected readonly demoDate = signal(new Date());

  // Signal for structural directive demonstration
  protected readonly showDetails = signal(false);

  // Tab control signal
  protected readonly activeTab = signal<'directives' | 'pipes'>('directives');

  protected setTab(tab: 'directives' | 'pipes'): void {
    this.activeTab.set(tab);
  }


  protected toggleDetails(): void {
    this.showDetails.update(val => !val);
  }

  protected changeText(): void {
    this.demoText.set(this.demoText() === 'learn angular' ? 'angular is awesome' : 'learn angular');
  }

  protected incrementPrice(): void {
    this.demoPrice.update(p => p + 100);
  }

  protected updateDate(): void {
    this.demoDate.set(new Date());
  }

  public ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }
}





