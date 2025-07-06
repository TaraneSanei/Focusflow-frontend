import { Component, computed, effect, inject, PLATFORM_ID, signal } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AppState } from '../state/app.state';
import { Store } from '@ngrx/store';
import { budget, income, payment, priority, recurringIncome, recurringPayment } from '../models/data.models';
import { AddIncome, DeleteIncome, EditIncome, LoadIncomes } from '../state/money/income/income.actions';
import { selectIncome } from '../state/money/income/income.selector';
import { selectPayment } from '../state/money/payment/payment.selector';
import { AddPayment, DeletePayment, EditPayment, LoadPayments } from '../state/money/payment/payment.actions';
import { CommonModule } from '@angular/common';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { FluidModule } from 'primeng/fluid';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PopoverModule } from 'primeng/popover';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TransactionDialogComponent } from '../transaction-dialog/transaction-dialog.component';
import { RecurrenceService } from '../recurrence/recurrence.service';
import { FocusflowService } from '../focusflow.service';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { selectBudget } from '../state/money/budget/budget.selector';
import { CardModule } from 'primeng/card';
import { AddBudget, DeleteBudget, EditBudget, LoadBudgets } from '../state/money/budget/budget.actions';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ChartModule } from 'primeng/chart';
import { SelectModule } from 'primeng/select';


@Component({
  selector: 'app-money',
  imports: [
    FullCalendarModule,
    CommonModule,
    ScrollPanelModule,
    PanelModule,
    ButtonModule,
    FluidModule,
    ConfirmDialogModule,
    ToastModule,
    PopoverModule,
    ConfirmPopupModule,
    CheckboxModule,
    FormsModule,
    CardModule,
    DividerModule,
    InputNumberModule,
    IftaLabelModule,
    InputTextModule,
    ColorPickerModule,
    ChartModule,
    SelectModule
  ],
  providers: [
    ConfirmationService, MessageService, DialogService
  ],
  templateUrl: './money.component.html',
  styleUrl: './money.component.css'
})
export class MoneyComponent {

  Payments = signal<payment[]>([])
  Incomes = signal<income[]>([])
  Budgets = signal<budget[]>([])

  chartData: any;
  chartOptions: any;
  currentMonth = signal<string>(((new Date).getMonth() + 1).toString());
  currentYear = signal<string>((new Date).getFullYear().toString());
  unpaidPayments = signal<boolean>(true)
  ref: DynamicDialogRef | undefined;
  increaseBudgetId = signal<number | undefined>(undefined)
  editBudgetId = signal<number | undefined>(undefined)
  newBudgetId = signal<boolean>(false)
  priority = priority

  awaitingResponse= signal<boolean>(false)

  edittableBudget: budget = {
    Title: '',
    Amount: 0,
    Color: '#ffffff'
  }
  newBudget: budget = {
    Title: '',
    Amount: 0,
    Color: '#b6b6b6'
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    eventSources: [],
    datesSet: (info) => this.onDateSet(info),
  };


  constructor(private store: Store<AppState>, private confirmationService: ConfirmationService, private messageService: MessageService, public dialogService: DialogService, private recurrenceService: RecurrenceService, private focusflowService: FocusflowService) {

    effect(() => {
      this.store.dispatch(LoadIncomes({ year: this.currentYear(), month: this.currentMonth() }));
      this.store.dispatch(LoadPayments({ year: this.currentYear(), month: this.currentMonth() }));
      this.store.dispatch(LoadBudgets());
    });
    effect(() => {
      const PaymentsData = this.store.selectSignal(selectPayment)
      this.Payments.set(PaymentsData())
      const IncomesData = this.store.selectSignal(selectIncome)
      this.Incomes.set(IncomesData())
      const BudgetsData = this.store.selectSignal(selectBudget)
      this.Budgets.set(BudgetsData())
    })

    effect(() => {
      const Paymentevents = this.getPaymentEvents()();
      const IncomeEvents = this.getIncomeEvents()();
      this.calendarOptions = {
        ...this.calendarOptions,
        eventSources: [
          {
            events: Paymentevents,
          },
          {
            events: IncomeEvents,
            color: '#0f766e'
          }
        ],
      }
    })

    effect(() => {
      this.updateChartData()
      this.updateChartOptions()
    })
  }

  onDateSet(info: any) {
    const start_day = info.start.getDate();
    let month = info.start.getMonth();
    let year = info.start.getFullYear();
    if (start_day != 1) {
      month = month + 2;
    } else {
      month = month + 1;
    }

    if (month > 12) {
      month = month - 12;
    }
    if (month === 1) {
      year = info.end.getFullYear();
    }
    let strYear = year.toString();
    let strMonth = month.toString();
    this.currentYear.set(strYear);
    this.currentMonth.set(strMonth);
  }


  getPaymentEvents() {
    return computed(() => {
      const paymentsEvents = this.Payments().filter(payment => !payment.Paid)
      .map(payment => (
        {
        color: this.getPriorityColor(payment.Priority) ,
        title: payment.Title,
        start: payment.Date,
        allDay: true,
      }));

      return [...paymentsEvents];
    });
  }

  getPaymentData() {
    const paymentsData = this.Payments().filter(payment => !payment.Paid)
    .map(payment => ({
      Amount: payment.Amount,
      Title: payment.Title,
      color: this.getPriorityColor(payment.Priority),
      borderColor: this.getBorderPriorityColor(payment.Priority)
  }))
    return paymentsData;
  }
  getIncomeData() {
    const incomeData = this.Incomes().filter(income => income.Left > 0)
    .map(income => ({
      Title: income.Title,
      Amount: income.Left
    }))
    return incomeData;
  }

  getIncomeEvents() {
    return computed(() => {
      const incomesEvents = this.Incomes().filter(income => income.Left > 0)
      .map(income => ({
        title: income.Title,
        start: income.Date,
        allDay: true,
      }));
      return [...incomesEvents]
    });
  }

  deleteTransactionDialog(event: Event, recurring: boolean, transaction: income | payment) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this transaction?',
      header: 'Are you sure?',
      icon: 'pi pi-reash',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },

      accept: () => {

        this.DeleteTransaction(transaction, recurring)

      }
    })
  }

  DeleteTransaction(transaction: income | payment, recurring: boolean) {
    if ("Priority" in transaction) {
      this.store.dispatch(DeletePayment({ payment: transaction }))
      if (recurring) {
        this.recurrenceService.deleteRPayment(transaction.Recurrence!.toString()).subscribe((response) => console.log(response))
      }
    } else {
      this.store.dispatch(DeleteIncome({ income: transaction }))
      if (recurring) {
        this.recurrenceService.deleteRIncome(transaction.Recurrence!.toString()).subscribe((response) => console.log(response))
      }
    }
  }

  openDialog(type: 'income' | 'payment', transaction?: income | payment, recurring?: boolean) {
    if (transaction) {
      if (recurring) {
        if (type === 'income') {
          this.recurrenceService.getRIncome(transaction!.Recurrence!.toString()).subscribe((response) => this.openTransactionDialog('recurringIncome', response))
        } else if (type === 'payment') {
          this.recurrenceService.getRPayment(transaction!.Recurrence!.toString()).subscribe((response) => this.openTransactionDialog('recurringPayment', response))
        }
      } else {
        this.openTransactionDialog(type, transaction);
      }
    } else {
      this.openTransactionDialog(type)
    }

  }


  openTransactionDialog(type: 'income' | 'payment' | 'recurringIncome' | 'recurringPayment', transaction?: income | payment | recurringIncome | recurringPayment) {
    this.ref = this.dialogService.open(TransactionDialogComponent, {
      data: {
        type: type,
        transaction: transaction
      },
      modal: true,
      header: `${transaction?.id ? 'Edit' : 'Add'} ${type}`,
      breakpoints: {
        '1536px': '42vw',
        '1280px': '52vw',
        '960px': '72vw',
        '640px': '92vw'
      },
      height: '90%'
    })
  }


  payPayment(payment: payment) {
    let paidPayment: payment = {
      ...payment,
      Paid: !payment.Paid,
    }
    if(paidPayment.Paid){
      if(this.spendIncome(payment.Amount) !== undefined){
        this.store.dispatch(EditPayment({ payment: paidPayment }))
      } else {
        console.error('insufficient funds')
      }
    } else {
      this.spendIncome(-payment.Amount)
      this.store.dispatch(EditPayment({ payment: paidPayment }))
      console.log('returning the fund to income')
    }
  }

  spendIncome(amount:number){
    let totalIncome = this.Incomes().reduce((sum, income) => sum + Number(income.Left), 0.0)
    if (totalIncome < amount){
      return undefined
    }
    this.Incomes().forEach((income)=> {
      if (amount === 0){
        return;
      }
      if(income.Left > 0 ){
        const deduction = Math.min(income.Left, amount);
        const updatedIncome = { ...income, Left: income.Left - deduction };
        amount -= deduction;
        this.store.dispatch(EditIncome({ income: updatedIncome }))
      }
    })
    return amount
  }

  viewAllPayments() {
    this.unpaidPayments.set(!this.unpaidPayments())
  }
  
  increaseBudget(budget: budget) {
    this.increaseBudgetId.set(budget.id)
    this.edittableBudget = {
      id: budget.id,
      Title: budget.Title,
      Amount: budget.Amount,
      Color: budget.Color
    }
  }

  editBudget(budget: budget) {
    this.editBudgetId.set(budget.id)
    this.edittableBudget = {
      id: budget.id,
      Title: budget.Title,
      Amount: budget.Amount,
      Color: budget.Color
    }
  }

  saveBudget() {
    if(this.increaseBudgetId()){
      const edittingBudget = this.Budgets().find((budget) => budget.id === this.increaseBudgetId())
      if(edittingBudget!.Amount < this.edittableBudget.Amount){
        const initialIncome = this.Incomes()[0]
         const budgetincome = { ...initialIncome,
          Left: Number(initialIncome.Left) + Number(edittingBudget!.Amount) - this.edittableBudget.Amount
        }
        console.log(budgetincome)
        this.store.dispatch(EditIncome({income: budgetincome}))

      } else if(edittingBudget!.Amount > this.edittableBudget.Amount){
        const budgetincome : income = {
          Title: `${edittingBudget!.Title} budget income`,
          Amount: edittingBudget!.Amount - this.edittableBudget.Amount,
          Date: this.focusflowService.DateToString(new Date()),
          Left: edittingBudget!.Amount - this.edittableBudget.Amount
        }
        console.log(budgetincome)
        this.store.dispatch(AddIncome({income: budgetincome}))
      }
    }
    this.increaseBudgetId.set(undefined)
    this.editBudgetId.set(undefined)
    this.store.dispatch(EditBudget({ budget: this.edittableBudget }))
    this.edittableBudget = {
      Title: '',
      Amount: 0,
      Color: '#b6b6b6'
    }
  }

  addBudget() {
    this.newBudgetId.set(true)
  }

  saveNewBudget() {
    this.store.dispatch(AddBudget({ budget: this.newBudget }))
    this.newBudgetId.set(false)
    this.newBudget = {
      Title: '',
      Amount: 0,
      Color: '#b6b6b6'
    }
  }

  deleteBudgetDialog(event: Event, budget: budget) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this budget?',
      header: 'Are you sure?',
      icon: 'pi pi-reash',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },

      accept: () => {

        this.deleteBudget(budget)

      }
    })
  }

  deleteBudget(budget: budget) {
    this.store.dispatch(DeleteBudget({ budget: budget }))
  }

  updateChartData() {
    this.chartData = {
      labels: ['payments', 'incomes'],
      datasets: [
        ...this.getPaymentData().map((payment) => ({
          label: payment.Title,
          data: [payment.Amount, 0],
          backgroundColor: payment.color,
          borderColor: payment.borderColor,
          borderWidth: 1,
          stack: 'payments'
        })),
        ...this.getIncomeData().map((income) => ({
          label: income.Title,
          data: [0, income.Amount],
          backgroundColor: this.getRandomColor(),
          borderWidth: 1,
          stack: 'incomes'
        }))
      ]
    }
  }

  getRandomColor(): string {
    const r = Math.floor(Math.random() * 256); 
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = 0.6;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  updateChartOptions() {
    this.chartOptions = {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context: any) => {
            const dataset = context.dataset;
            const title = dataset.titles[context.dataIndex];
            const value = context.raw;
            return `${title}: $${value}`;
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false
          }
        },
        y: {
          stacked: true,
          grid: {
            display: false
          }
        }
      }
    }
  }

  
  getPriorityColor(priority: string): string {
    switch (priority.toLowerCase()) {
      case 'urgent': return 'rgba(231, 48, 16, 0.6)';
      case 'high': return 'rgba(204, 102, 51, 0.6)';
      case 'medium': return 'rgba(229, 155, 82, 0.6)';
      case 'low': return 'rgba(137, 151, 126, 0.6)';
      case 'unnecessary': return 'rgba(150, 150, 150, 0.6)';
      default: return 'rgba(81, 204, 252, 0.6)';
    }
  }
  
  getBorderPriorityColor(priority: string): string {
    switch (priority.toLowerCase()) {
      case 'urgent': return 'rgba(231, 48, 16, 1)';
      case 'high': return 'rgba(204, 102, 51, 1)';
      case 'medium': return 'rgba(229, 155, 82, 1)';
      case 'low': return 'rgba(137, 151, 126, 1)';
      case 'unnecessary': return 'rgba(150, 150, 150, 1)';
      default: return 'rgba(81, 204, 252, 1)';
    }
  }
}