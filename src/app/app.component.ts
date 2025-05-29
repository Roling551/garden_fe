import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlaneComponent } from './plane/plane.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PlaneComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'garden';
}
