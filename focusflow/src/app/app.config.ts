import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MyPreset } from '../mypreset';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { JournalReducer } from './state/journal/journal.reducer';
import { JournalEffects } from './state/journal/journal.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authInterceptor } from './auth/auth.interceptor';
import { IncomeReducer } from './state/money/income/income.reducer';
import { PaymentReducer } from './state/money/payment/payment.reducer';
import { PaymentEffects } from './state/money/payment/payment.effects';
import { IncomeEffects } from './state/money/income/income.effects';
import { BudgetReducer } from './state/money/budget/budget.reducer';
import { BudgetEffects } from './state/money/budget/budget.effects';
import { CategoriesReducer } from './state/masterlist/category/category.reducer';
import { CategoriesEffects } from './state/masterlist/category/category.effects';
import { EmotionReducer } from './state/emotion/emotion.reducer';
import { EmotionEffects } from './state/emotion/emotion.effects';
import { ProjectsEffects } from './state/masterlist/project/project.effects';
import { TasksEffects } from './state/masterlist/task/task.effects';
import { SubtasksEffects } from './state/masterlist/subtask/subtask.effects';
import { EventsEffects } from './state/masterlist/event/event.effects';
import { ProjectsReducer } from './state/masterlist/project/project.reducer';
import { TasksReducer } from './state/masterlist/task/task.reducer';
import { SubtasksReducer } from './state/masterlist/subtask/subtask.reducer';
import { EventsReducer } from './state/masterlist/event/event.reducer';
import { RecurringEventsReducer } from './state/masterlist/recurringEvent/recurringEvent.reducer';
import { RecurringSubtasksReducer } from './state/masterlist/recurringSubtask/recurringSubtask.reducer';
import { RecurringTasksReducer } from './state/masterlist/recurringTask/recurringTask.reducer';
import { RecurringTasksEffects } from './state/masterlist/recurringTask/recurringTask.effects';
import { RecurringSubtasksEffects } from './state/masterlist/recurringSubtask/recurringSubtask.effects';
import { RecurringEventsEffects } from './state/masterlist/recurringEvent/recurringEvent.effects';


export const appConfig: ApplicationConfig = {
  providers: [
    //system
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    CookieService,
    provideHttpClient(
      withInterceptors([
        authInterceptor,
      ])
    ),
    //ngrx
    provideStore({
      emotion: EmotionReducer,
      journal: JournalReducer,
      income: IncomeReducer,
      payment: PaymentReducer,
      budget: BudgetReducer,
      categories: CategoriesReducer,
      projects: ProjectsReducer,  
      tasks: TasksReducer,
      subtasks: SubtasksReducer,
      events: EventsReducer,
      recurringTasks: RecurringTasksReducer,
      recurringSubtasks: RecurringSubtasksReducer,
      recurringEvents: RecurringEventsReducer
    }),
    provideEffects([
      EmotionEffects,
      JournalEffects,
      PaymentEffects,
      IncomeEffects,
      BudgetEffects,
      CategoriesEffects,
      ProjectsEffects,
      TasksEffects,
      SubtasksEffects,
      EventsEffects,
      RecurringTasksEffects,
      RecurringSubtasksEffects,
      RecurringEventsEffects
    ]),
    provideStoreDevtools({ 
      maxAge: 25, 
      logOnly: !isDevMode() 
    }), 
    //PrimeNG
    provideAnimationsAsync(),
    providePrimeNG({
        theme: { preset: MyPreset, },
        ripple: true,
        inputVariant: 'filled'
    }),
  ]
};
