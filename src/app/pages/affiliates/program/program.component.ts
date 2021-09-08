import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit, AfterViewInit {
  @ViewChild('circle') circle: ElementRef;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setHeight();
  }
  constructor(private renderer: Renderer2) { }
  ngAfterViewInit(): void {
    this.setHeight();
  }

  ngOnInit(): void {
  }

  setHeight() {
    this.renderer.setStyle(this.circle.nativeElement, 'height', this.circle.nativeElement.offsetWidth + 'px')
  }

}
