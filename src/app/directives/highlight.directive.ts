import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  // Configurable highlight color, defaulting to a translucent indigo glow matching our theme
  @Input() appHighlight = 'rgba(99, 102, 241, 0.15)';

  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2
  ) {
    // Initial transition setups for smooth interactions
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)');
  }

  @HostListener('mouseenter') 
  public onMouseEnter(): void {
    this.setStyles(this.appHighlight, 'scale(1.03)', '0 10px 25px -5px rgba(99, 102, 241, 0.25)');
  }

  @HostListener('mouseleave') 
  public onMouseLeave(): void {
    this.setStyles('transparent', 'scale(1)', 'none');
  }

  private setStyles(background: string, transform: string, shadow: string): void {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', background);
    this.renderer.setStyle(this.el.nativeElement, 'transform', transform);
    this.renderer.setStyle(this.el.nativeElement, 'boxShadow', shadow);
  }
}
