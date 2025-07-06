import { Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { routes } from '../app.routes';



// I possibly don't need a home component any more. if proved redundant, delete later
@Component({
  selector: 'app-home',
  imports: [
    TabsModule,
    RouterModule,
    CommonModule
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    // tabs = routes.filter((route) => route.outlet === "home")
    AllowedTitles = ['journal', 'money', 'masterlist', 'plan']
    tabs = routes.filter((route) => this.AllowedTitles.includes(route.title!.toString()))
  }

