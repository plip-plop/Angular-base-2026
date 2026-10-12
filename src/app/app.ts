import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html'
})
export class App {
  isHovered = false;

  toggleIsHovered() {
    this.isHovered = !this.isHovered;
  }
}
