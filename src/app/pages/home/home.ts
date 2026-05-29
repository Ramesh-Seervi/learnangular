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
  protected readonly activeTab = signal<'directives' | 'pipes' | 'lifecycle' | 'modules' | 'bindings' | 'di' | 'services' | 'providers' | 'typescript' | 'components'>('directives');

  protected readonly lifecycleLogs = signal<string[]>([]);
  protected readonly isSimulating = signal<boolean>(false);

  // Data Binding demo properties
  protected readonly isBtnDisabled = signal(false);
  protected readonly bindingClickCount = signal(0);
  protected twoWayValue = 'Angular Learner';

  // Services demo properties (mocking a shared service state)
  protected readonly serviceCounter = signal(5);

  protected setTab(tab: 'directives' | 'pipes' | 'lifecycle' | 'modules' | 'bindings' | 'di' | 'services' | 'providers' | 'typescript' | 'components'): void {
    this.activeTab.set(tab);
  }

  protected toggleBtnDisabled(): void {
    this.isBtnDisabled.update(v => !v);
  }

  protected incrementBindingClick(): void {
    this.bindingClickCount.update(c => c + 1);
  }

  protected incrementServiceCounter(): void {
    this.serviceCounter.update(c => c + 1);
  }

  protected decrementServiceCounter(): void {
    this.serviceCounter.update(c => c - 1);
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

  // TypeScript Compiler Simulator properties
  protected readonly selectedTsScenario = signal<'success' | 'typeMismatch' | 'accessViolation' | 'nullPointer'>('success');
  protected readonly tsConsoleLog = signal<string[]>([]);
  protected readonly isCompilingTs = signal<boolean>(false);

  protected runTsCompilerDemo(scenario: 'success' | 'typeMismatch' | 'accessViolation' | 'nullPointer'): void {
    if (this.isCompilingTs()) return;
    this.isCompilingTs.set(true);
    this.selectedTsScenario.set(scenario);
    this.tsConsoleLog.set(['🔍 Starting TypeScript compilation via tsc...']);

    const outputs: Record<'success' | 'typeMismatch' | 'accessViolation' | 'nullPointer', { delay: number; log: string }[]> = {
      success: [
        { delay: 400, log: '⚙️ Processing entrypoint: src/app/app.ts' },
        { delay: 800, log: '✨ Checking typings for Component parameters & Signals...' },
        { delay: 1200, log: '🟢 Compilation successful. 0 errors, 0 warnings.' },
        { delay: 1600, log: '📦 Generated ESNext bundles for browser environment.' }
      ],
      typeMismatch: [
        { delay: 400, log: '⚙️ Processing entrypoint: src/app/user.component.ts' },
        { delay: 800, log: '❌ src/app/user.component.ts:18:5 - error TS2322: Type \'string\' is not assignable to type \'number\'.' },
        { delay: 1200, log: '    18   this.userId.set("A12");' },
        { delay: 1300, log: '                ~~~~~~~~~~~~~' },
        { delay: 1600, log: '🛑 Compilation failed with 1 type error.' }
      ],
      accessViolation: [
        { delay: 400, log: '⚙️ Processing entrypoint: src/app/pages/home/home.html' },
        { delay: 800, log: '❌ src/app/pages/home/home.html:801:4 - error TS2448: Property \'auth\' is private and only accessible within class \'AuthService\'.' },
        { delay: 1200, log: '    801  <div>{{ auth.username }}</div>' },
        { delay: 1300, log: '              ~~~~' },
        { delay: 1600, log: '🛑 Compilation failed: Enforced encapsulation boundary violated.' }
      ],
      nullPointer: [
        { delay: 400, log: '⚙️ Processing entrypoint: src/app/profile.component.ts' },
        { delay: 800, log: '❌ src/app/profile.component.ts:12:15 - error TS18047: \'currentUser\' is possibly \'null\' or \'undefined\'.' },
        { delay: 1200, log: '    12   this.name = this.currentUser.name;' },
        { delay: 1300, log: '                        ~~~~~~~~~~~' },
        { delay: 1600, log: '💡 Tip: Use safe navigation: `currentUser?.name` or non-null assertion: `currentUser!.name`' },
        { delay: 1800, log: '🛑 Compilation failed: Strict null checks enabled.' }
      ]
    };

    const steps = outputs[scenario];
    steps.forEach((step, index) => {
      setTimeout(() => {
        this.tsConsoleLog.update(prev => [...prev, step.log]);
        if (index === steps.length - 1) {
          this.isCompilingTs.set(false);
        }
      }, step.delay);
    });
  }

  // Component Architecture simulator properties
  protected readonly parentMessage = signal<string>('Hello from Parent! 👋');
  protected readonly childEventsLog = signal<string[]>([]);

  protected triggerChildEvent(action: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.childEventsLog.update(prev => [
      `⚡ [${timestamp}] Parent received event: "${action}"`,
      ...prev
    ]);
  }

  protected clearChildEvents(): void {
    this.childEventsLog.set([]);
  }

  public ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }
}





