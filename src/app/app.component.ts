import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GardenComponent } from '../features/garden/garden.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GardenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'garden';
}
