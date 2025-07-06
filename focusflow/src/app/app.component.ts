import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { routes } from './app.routes';
@Component({
  selector: 'app-root',
  imports: [
    TabsModule,
    RouterModule,
    CommonModule

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'focusflow';

}
