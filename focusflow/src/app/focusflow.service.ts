import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { budget, category, emotion, event, income, JournalEntry, payment, project, recurringEvent, recurringIncome, recurringSubtask, recurringTask, subtask, task } from './models/data.models';

@Injectable({
  providedIn: 'root'
})
export class FocusflowService {
  private apiURL = environment.apiUrl;
  constructor(private httpclient: HttpClient) {}
  //get emotions list
  getEmotions(): Observable<emotion[]> {
    return this.httpclient.get<emotion[]>(this.apiURL + 'journal/emotions')
  }
  //journal crud

  getJournal(url: string | null): Observable<any> {
    if (url) {
      return this.httpclient.get<any>(url)
    }
    return this.httpclient.get<any>(this.apiURL + 'journal/')
  }

  addJournal(journalEntry: JournalEntry){
    return this.httpclient.post<JournalEntry>(this.apiURL + 'journal/', journalEntry)
  }

  editJournal(journalEntry: JournalEntry){
    return this.httpclient.put<JournalEntry>(this.apiURL + 'journal/' + journalEntry.id , journalEntry)
  }

  deleteJournal(journalEntry: JournalEntry){
    return this.httpclient.delete<JournalEntry>(this.apiURL + 'journal/' + journalEntry.id)
  }


  //money
  
  getPayments(year: string, month:string){
    return this.httpclient.get<payment[]>(this.apiURL + 'money/payments?year='+ year +'&month=' + month)
  }

  getIncomes(year: string, month:string){
    return this.httpclient.get<income[]>(this.apiURL + 'money/incomes?year='+ year + '&month=' + month)
  }
  
  addIncome(income: income){
    return this.httpclient.post<income>(this.apiURL + 'money/incomes', income)
  }

  addPayment(payment: payment){
    return this.httpclient.post<payment>(this.apiURL + 'money/payments', payment)
  }
  
  deleteIncome(income: income){
    return this.httpclient.delete<income>(this.apiURL + 'money/incomes/' + income.id)
  }
  
  deletePayment(payment: payment){
    return this.httpclient.delete<payment>(this.apiURL + 'money/payments/' + payment.id)
  }
  
  editIncome(income: income){
    return this.httpclient.put<income>(this.apiURL + 'money/incomes/' + income.id, income);
  }
  
  editPayment(payment: payment){
    return this.httpclient.put<payment>(this.apiURL + 'money/payments/' + payment.id, payment);
  }

  getBudgets(){
    return this.httpclient.get<budget[]>(this.apiURL + 'money/budgets');
  }

  addBudget(budget: budget){
    return this.httpclient.post<budget>(this.apiURL + 'money/budgets', budget);
  }
    
  editBudget(budget: budget){
    return this.httpclient.put<budget>(this.apiURL + 'money/budgets/' + budget.id, budget);
  }
    
  deleteBudget(budget: budget){
    return this.httpclient.delete<budget>(this.apiURL + 'money/budgets/' + budget.id);
  }

  //masterlist
  getCategories(){
    return this.httpclient.get<category[]>(this.apiURL + 'masterlist/categories');
  }

  getProjects(){
    return this.httpclient.get<project[]>(this.apiURL + 'masterlist/projects');
  }
  
  getTasks(){
    return this.httpclient.get<task[]>(this.apiURL + 'masterlist/tasks');
  }

  getSubtasks(){
    return this.httpclient.get<subtask[]>(this.apiURL + 'masterlist/subtasks');
  }
  
  getRecurringTasks(){
    return this.httpclient.get<recurringTask[]>(this.apiURL + 'masterlist/recurringtasks');
  }
  
  
  getRecurringSubtasks(){
    return this.httpclient.get<recurringSubtask[]>(this.apiURL + 'masterlist/recurringsubtasks');
  }
  
  
  getEvents(){
    return this.httpclient.get<event[]>(this.apiURL + 'masterlist/events');
  }
  
  
  getRecurringEvents(){
    return this.httpclient.get<recurringEvent[]>(this.apiURL + 'masterlist/recurringevents');
  }

  addCategory(category: category){
    return this.httpclient.post<category>(this.apiURL + 'masterlist/categories', category)
  }

  addProject(project: project){
    return this.httpclient.post<project>(this.apiURL + 'masterlist/projects', project)
  }

  addTask(task: task){
    return this.httpclient.post<task>(this.apiURL + 'masterlist/tasks', task)
  }

  addSubtask(subtask: subtask){
    return this.httpclient.post<subtask>(this.apiURL + 'masterlist/subtasks', subtask)
  }

  addEvent(event: event){
    return this.httpclient.post<event>(this.apiURL + 'masterlist/events', event)
  }

  addRecurringTask(recurringTask: recurringTask){
    return this.httpclient.post<recurringTask>(this.apiURL + 'masterlist/recurringtasks', recurringTask)
  }

  addRecurringSubtask(recurringSubtask: recurringSubtask){
    return this.httpclient.post<recurringSubtask>(this.apiURL + 'masterlist/recurringsubtasks', recurringSubtask)
  }

  addRecurringEvent(event: recurringEvent){
    return this.httpclient.post<recurringEvent>(this.apiURL + 'masterlist/recurringevents', event)
  }

  editCategory(category: category){
    return this.httpclient.put<category>(this.apiURL + 'masterlist/categories/' + category.id, category);
  }

  deleteCategory(category: category){
    return this.httpclient.delete<category>(this.apiURL + 'masterlist/categories/' + category.id);
  }

  editEvent(event: event){
    return this.httpclient.put<event>(this.apiURL + 'masterlist/events/' + event.id, event);
  }

  deleteEvent(event: event){
    return this.httpclient.delete<event>(this.apiURL + 'masterlist/events/' + event.id);
  }

  editTask(task: task){
    return this.httpclient.put<task>(this.apiURL + 'masterlist/tasks/' + task.id, task);
  }

  deleteTask(task: task){
    return this.httpclient.delete<task>(this.apiURL + 'masterlist/tasks/' + task.id);
  }

  editSubtask(subtask: subtask){
    return this.httpclient.put<subtask>(this.apiURL + 'masterlist/subtasks/' + subtask.id, subtask);
  }

  deleteSubtask(subtask: subtask){
    return this.httpclient.delete<subtask>(this.apiURL + 'masterlist/subtasks/' + subtask.id);
  }

  editRecurringEvent(event: recurringEvent){
    return this.httpclient.put<recurringEvent>(this.apiURL + 'masterlist/recurringevents/' + event.id, event);
  }

  deleteRecurringEvent(event: recurringEvent){
    return this.httpclient.delete<recurringEvent>(this.apiURL + 'masterlist/recurringevents/' + event.id);
  }

  editRecurringTask(recurringTask: recurringTask){
    return this.httpclient.put<recurringTask>(this.apiURL + 'masterlist/recurringtasks/' + recurringTask.id, recurringTask);
  }

  deleteRecurringTask(recurringTask: recurringTask){
    return this.httpclient.delete<recurringTask>(this.apiURL + 'masterlist/recurringtasks/' + recurringTask.id);
  }

  editRecurringSubtask(recurringSubtask: recurringSubtask){
    return this.httpclient.put<recurringSubtask>(this.apiURL + 'masterlist/recurringsubtasks/' + recurringSubtask.id, recurringSubtask);
  }

  deleteRecurringSubtask(recurringSubtask: recurringSubtask){
    return this.httpclient.delete<recurringSubtask>(this.apiURL + 'masterlist/recurringsubtasks/' + recurringSubtask.id);
  }

  deleteProject(project: project){
    return this.httpclient.delete<project>(this.apiURL + 'masterlist/projects/' + project.id);
  }

  editProject(project: project){
    return this.httpclient.put<project>(this.apiURL + 'masterlist/projects/' + project.id, project);
  }

  DateToString(Date: Date): string {
    let StrDate = "";
    let Year = Date.getFullYear();
    let Month = Date.getMonth() + 1;
    let Day = Date.getDate();
    let MonthStr: string;
    let DayStr: string;
    if (Month < 10) {
      MonthStr = `0${Month}`
    } else {MonthStr = `${Month}`}
    if (Day < 10) {
      DayStr = `0${Day}`
    } else {DayStr = `${Day}`}
    StrDate = `${Year}-${MonthStr}-${DayStr}`
    return StrDate;
  }

}
