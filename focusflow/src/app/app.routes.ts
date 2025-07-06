import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth/auth.guard';
import { JournalComponent } from './journal/journal.component';
import { MoneyComponent } from './money/money.component';
import { AppComponent } from './app.component';
import { MasterlistComponent } from './masterlist/masterlist.component';
import { PlanComponent } from './plan/plan.component';

export const routes: Routes = [
        { path: 'login', component: LoginComponent, title:'login' },
        { path: '', component: HomeComponent, canActivate: [authGuard], title:'home', children:[
                { path: 'journal', component: JournalComponent, title: 'journal'},
                { path: 'money', component: MoneyComponent, title:'money'},
                { path: 'masterlist', component: MasterlistComponent, title:'masterlist'},
                { path: 'plan', component: PlanComponent, title:'plan'},

        ]},
        { path: 'journal', component: JournalComponent, title: 'journal'},
        { path: 'money', component: MoneyComponent, title:'money'},
        { path: 'masterlist', component: MasterlistComponent, title:'masterlist'},
        { path: 'plan', component: PlanComponent, title:'plan'},

];
