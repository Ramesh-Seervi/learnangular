import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { UpperCasePipe, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-home',
  imports: [RouterLink, HighlightDirective, UpperCasePipe, CurrencyPipe, DatePipe, FormsModule],
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
  protected readonly activeTab = signal<'directives' | 'pipes' | 'lifecycle' | 'modules' | 'bindings' | 'di'>('directives');

  protected readonly lifecycleLogs = signal<string[]>([]);
  protected readonly isSimulating = signal<boolean>(false);

  // Data Binding demo properties
  protected readonly isBtnDisabled = signal(false);
  protected readonly bindingClickCount = signal(0);
  protected twoWayValue = 'Angular Learner';

  protected setTab(tab: 'directives' | 'pipes' | 'lifecycle' | 'modules' | 'bindings' | 'di'): void {
    this.activeTab.set(tab);
  }

  protected toggleBtnDisabled(): void {
    this.isBtnDisabled.update(v => !v);
  }

  protected incrementBindingClick(): void {
    this.bindingClickCount.update(c => c + 1);
  }

  protected runLifecycleDemo(): void {
    if (this.isSimulating()) return;
    this.isSimulating.set(true);
    this.lifecycleLogs.set([]);

    const steps = [
      { log: '🟢 [1/8] constructor(): Component created & Dependency Injection done.', delay: 0 },
      { log: '🔵 [2/8] ngOnChanges(): Inputs initialized/changed. Receives SimpleChanges.', delay: 600 },
      { log: '🟢 [3/8] ngOnInit(): Init done. Recommended for initial HTTP fetch.', delay: 1200 },
      { log: '🟡 [4/8] ngDoCheck(): Custom change detection check triggered.', delay: 1800 },
      { log: '🟣 [5/8] ngAfterContentInit(): Projected content (<ng-content>) loaded.', delay: 2400 },
      { log: '🟣 [6/8] ngAfterContentChecked(): Projected content check completed.', delay: 3000 },
      { log: '🔴 [7/8] ngAfterViewInit(): View & child views ready. Safe for direct DOM access.', delay: 3600 },
      { log: '🔴 [8/8] ngAfterViewChecked(): View verification completed.', delay: 4200 },
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        this.lifecycleLogs.update(prev => [...prev, step.log]);
        if (index === steps.length - 1) {
          this.isSimulating.set(false);
        }
      }, step.delay);
    });
  }

  protected clearLifecycleLogs(): void {
    this.lifecycleLogs.set([]);
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





