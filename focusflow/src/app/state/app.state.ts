import { EmotionState } from "./emotion/emotion.reducer";
import { JournalState } from "./journal/journal.reducer";
import { BudgetState } from "./money/budget/budget.reducer";
import { IncomeState } from "./money/income/income.reducer";
import { PaymentState } from "./money/payment/payment.reducer";
import { CategoriesState } from "./masterlist/category/category.reducer";
import { ProjectsState } from "./masterlist/project/project.reducer";
import { TasksState } from "./masterlist/task/task.reducer";
import { SubtasksState } from "./masterlist/subtask/subtask.reducer";
import { EventsState } from "./masterlist/event/event.reducer";

export interface AppState{
    emotion: EmotionState;
    journal: JournalState;
    income: IncomeState;
    payment: PaymentState;
    budget: BudgetState;
    categories : CategoriesState;
    projects : ProjectsState;
    tasks : TasksState;
    subtasks : SubtasksState;
    events : EventsState;
}