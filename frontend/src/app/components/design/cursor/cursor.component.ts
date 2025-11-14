import {
  Component,
  HostListener,
  AfterViewInit,
  OnDestroy,
  OnInit,
  ElementRef,
} from "@angular/core";
import { gsap } from "gsap";

@Component({
  selector: "app-cursor",
  templateUrl: "./cursor.component.html",
  styleUrls: ["./cursor.component.css"],
})
export class CursorComponent implements AfterViewInit, OnDestroy, OnInit {
  private cursor!: HTMLElement;
  private mouseX = 0;
  private mouseY = 0;

  constructor(private el: ElementRef) {}
  // Vérification de elément ref
  ngOnInit(): void {
    console.log(this.el);
    console.log(this.el.nativeElement);
    console.log(this.el.nativeElement.querySelector(".cursor"));
  }

  @HostListener("document:mousemove", ["$event"])
  onMouseMove(e: MouseEvent) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  @HostListener("document:mouseover", ["$event"])
  onMouseOver(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.tagName === "A" || target.tagName === "BUTTON") {
      gsap.to(this.cursor, {
        scale: 2.3,
        duration: 0.2,
      });
    }
  }

  @HostListener("document:mouseout", ["$event"])
  onMouseOut(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.tagName === "A" || target.tagName === "BUTTON") {
      gsap.to(this.cursor, { scale: 1, duration: 0.2 });
    }
  }

  ngAfterViewInit(): void {
    this.cursor = this.el.nativeElement.querySelector(".cursor");

    gsap.ticker.add(() => {
      this.animate();
    });
  }

  private animate() {
    gsap.to(this.cursor, {
      x: this.mouseX,
      y: this.mouseY,
      duration: 0.1,
    });
  }

  ngOnDestroy(): void {
    gsap.ticker.remove(() => {
      this.animate();
    });
  }
}
