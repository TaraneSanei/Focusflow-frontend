import { Component, inject, OnInit, signal } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { income, payment, recurringIncome, recurringPayment } from '../models/data.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { CheckboxModule } from 'primeng/checkbox';
import { RecurrenceService } from '../recurrence/recurrence.service';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { DividerModule } from 'primeng/divider';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DaysOfWeek, FrequencyValues, Monthdays, MonthlyPatterns, Months, Nth, recurrenceConfig } from '../recurrence/recurrence.config';
import { Subscription } from 'rxjs';
import { CardModule } from 'primeng/card';
import { FocusflowService } from '../focusflow.service';
import { AppState } from '../state/app.state';
import { Store } from '@ngrx/store';
import { AddIncome, EditIncome } from '../state/money/income/income.actions';
import { AddPayment, EditPayment } from '../state/money/payment/payment.actions';
import { TextareaModule } from 'primeng/textarea';


@Component({
  selector: 'app-transaction-dialog',
  imports: [
    ReactiveFormsModule,
    InputNumberModule,
    DatePickerModule,
    InputTextModule,
    IftaLabelModule,
    CheckboxModule,
    CommonModule,
    SelectModule,
    SelectButtonModule,
    ButtonModule,
    InputIconModule,
    DividerModule,
    CommonModule,
    ToggleButtonModule,
    CardModule,
    TextareaModule
  ],
  templateUrl: './transaction-dialog.component.html',
  styleUrl: './transaction-dialog.component.css'
})
export class TransactionDialogComponent implements OnInit {

  public ref = inject(DynamicDialogRef)
  public con = inject(DynamicDialogConfig)
  data: payment | income | recurringIncome | recurringPayment | undefined;
  type: string;
  transactionForm: FormGroup;
  newRrule = signal<boolean>(false)
  recurrenceEdit = signal<boolean>(true)
  frequencyValues = FrequencyValues
  daysOfWeek = DaysOfWeek
  months = Months
  monthlyPattern = MonthlyPatterns
  monthdays = Monthdays
  nth = Nth
  endPatterns = [
    { label: 'until', value: 'EndDate' },
    { label: 'For', value: 'Count' }
  ]
  priorities = [
    { value: "URGENT", label: "Urgent" },
    { value: "HIGH", label: "High" },
    { value: "MEDIUM", label: "Medium" },
    { value: "LOW", label: "Low" },
    { value: "UNNECESSARY", label: "Unnecessary" }
  ]

  recurrenceRules: string[] = []
  frequencySubscription: Subscription | undefined
  endSubscription: Subscription | undefined
  endPatternSubscription: Subscription | undefined
  monthlyPatternSubscription: Subscription | undefined

  constructor(private fb: FormBuilder, private recurrenceServise: RecurrenceService, private focusflowService: FocusflowService, private store: Store<AppState>) {
    this.data = this.con.data.transaction;
    this.type = this.con.data.type;

    this.transactionForm = this.fb.group({
      title: [this.data?.Title || '', Validators.required],
      amount: [this.data?.Amount || '', [Validators.required, Validators.min(0)]],
      date: [{ value: "", disabled: true }, Validators.required],
      recurring: [{ value: "", disabled: true }, Validators.required],
    })

  }

  ngOnInit(): void {
    if (this.data) {
      if ('Date' in this.data) {
        let singletransaction: payment | income = this.data
        if (singletransaction.Recurrence) {
          this.recurrenceEdit.set(false)
          this.transactionForm.get('date')?.patchValue(this.data?.Date ? new Date(this.data?.Date) : this.data?.Date || new Date())
          this.transactionForm.get('date')?.enable()
        } else {
          this.transactionForm.get('date')?.patchValue(this.data?.Date ? new Date(this.data?.Date) : this.data?.Date || new Date())
          this.transactionForm.get('date')?.enable()
          this.transactionForm.get('recurring')?.patchValue(this.data?.Recurrence ? true : false || false)
          this.transactionForm.get('recurring')?.enable()
        }
      }

      if ('RecurrenceRule' in this.data) {
        this.recurrenceRules = this.data.RecurrenceRule.split("\n")
        this.transactionForm.get('recurring')?.patchValue(true)
        console.log(this.recurrenceRules)
      }
    } else {
      this.transactionForm.get('date')?.patchValue(new Date())
      this.transactionForm.get('date')?.enable()
      this.transactionForm.get('recurring')?.patchValue(false)
      this.transactionForm.get('recurring')?.enable()
    }

    if (this.type === 'payment' || 'recurringPayment') {
      this.transactionForm.addControl('priority', this.fb.control('MEDIUM'))
    }
  }

  get date() {
    return this.transactionForm.get('date')
  }

  get amount() {
    return this.transactionForm.get('amount')
  }

  get rrule() {
    return this.transactionForm.get('rrule') as FormGroup
  }

  get end() {
    return this.transactionForm.get('rrule.end')
  }

  initRrule() {
    return this.fb.group({
      frequency: ['DAILY', Validators.required],
      interval: [1, Validators.required],
      daysOfWeek: [{ value: [], disabled: true }],
      monthlyPattern: [{ value: 'Monthdays', disabled: true }],
      monthdays: [{ value: '', disabled: true }],
      weekdays: [{ value: '', disabled: true }],
      nth: [{ value: '', disabled: true }],
      months: [{ value: [], disabled: true }],
      end: [false],
      endPattern: [{ value: 'Count', disabled: true }],
      endDate: [{ value: '', disabled: true }],
      count: [{ value: 1, disabled: true }],
    })
  }

  addRule() {
    this.newRrule.set(true)
    this.transactionForm.addControl('rrule', this.initRrule())
    if (!this.frequencySubscription) {
      this.rrule.get('frequency')?.valueChanges.subscribe((frequency) => {
        this.updateRrules(frequency)
      })
    }

    if (!this.monthlyPatternSubscription) {
      this.rrule.get('monthlyPattern')?.valueChanges.subscribe((pattern) => {
        if (pattern === 'Monthdays') {
          this.rrule.get('monthdays')?.enable()
          this.rrule.get('weekdays')?.disable()
          this.rrule.get('nth')?.disable()
        } else if (pattern === 'Weekdays') {
          this.rrule.get('monthdays')?.disable()
          this.rrule.get('weekdays')?.enable()
          this.rrule.get('nth')?.enable()
        }
      })
    }
    if (!this.endSubscription) {
      this.rrule.get('end')?.valueChanges.subscribe((end) => {
        if (end) {
          this.updateEnd()
          this.rrule.get('endPattern')?.enable()
        } else {
          this.rrule.get('endPattern')?.disable()
          this.rrule.get('count')?.disable()
          this.rrule.get('endDate')?.disable()

        }
      }
      )
    }
    this.rrule.updateValueAndValidity()

  }

  updateRrules(frequency: string) {
    if (frequency) {
      const config = recurrenceConfig[frequency]
      if (config.initialValues) {
        const context = { date: this.date?.value || new Date() }
        for (const [control, initialValue] of Object.entries(config.initialValues)) {
          const value = typeof initialValue === 'function' ? initialValue(context) : initialValue
          this.rrule.get(control)?.patchValue(value)
          this.rrule.get(control)?.enable()
        }
      }
      if (config.validators) {
        for (const [control, validators] of Object.entries(config.validators)) {
          this.rrule.get(control)?.setValidators(validators);

        }
      }
      this.rrule.updateValueAndValidity()
    }
  }

  updateEnd() {
    if (!this.endPatternSubscription) {
      this.rrule.get('endPattern')?.valueChanges.subscribe((pattern) => {
        if (pattern === 'EndDate') {
          this.rrule.get('endDate')?.enable()
          this.rrule.get('endDate')?.setValidators(Validators.required)
          this.rrule.get('count')?.disable()
        } else if (pattern === 'Count') {
          this.rrule.get('count')?.enable()
          this.rrule.get('count')?.setValidators([Validators.required, Validators.min(1)])
          this.rrule.get('endDate')?.disable()
        }
      })
      this.rrule.updateValueAndValidity()
    }
  }


  saveRule() {
    let rule = ""
    let interval = this.rrule.get('interval')?.value
    let frequency = this.rrule.get('frequency')?.value
    let daysOfWeek = this.rrule.get('daysOfWeek')?.value
    let monthlypatterns = this.rrule.get('monthlyPattern')?.value
    let monthdays = this.rrule.get('monthdays')?.value
    let weekdays = this.rrule.get('weekdays')?.value
    let nth = this.rrule.get('nth')?.value
    let end = this.rrule.get('end')?.value
    let endpattern = this.rrule.get('endPattern')?.value
    let enddate = this.rrule.get('endDate')?.value
    let count = this.rrule.get('count')?.value
    let months = this.rrule.get('months')?.value
    if (interval > 1) {
      if (frequency === 'daily') {
        rule = `every ${interval} days`
      } else if (frequency === 'weekly') {
        rule = `every ${interval} weeks on ${daysOfWeek.join(' and ')}s`
      } else if (frequency === 'monthly') {
        if (monthlypatterns === 'Weekdays') {
          rule = `every ${interval} months on the ${nth} ${weekdays.join(' and ')}s`
        } else if (monthlypatterns === 'Monthdays') {
          rule = `every ${interval} months on ${monthdays.join(' and ')}`
        }
      } else if (frequency === 'yearly') {
        if (monthlypatterns === 'Weekdays') {
          rule = `every ${interval} years in ${months.join(' and ')} on the ${nth} ${weekdays.join(' and ')}s`
        } else if (monthlypatterns === 'Monthdays') {
          rule = `every ${interval} years in ${months.join(' and ')} on ${monthdays.join(' and ')}`
        }
      }
    } else {
      if (frequency === 'daily') {
        rule = 'every day'
      } else if (frequency === 'weekly') {
        rule = `every week on ${daysOfWeek.join(' and ')}s`
      } else if (frequency === 'monthly') {
        if (monthlypatterns === 'Weekdays') {
          rule = `every month on the ${nth} ${weekdays.join(' and ')}s`
        } else if (monthlypatterns === 'Monthdays') {
          rule = `every month on ${monthdays.join(' and ')}`
        }
      } else if (frequency === 'yearly') {
        if (monthlypatterns === 'Weekdays') {
          rule = `every year in ${months} on the ${nth} ${weekdays.join(' and ')}s`
        } else if (monthlypatterns === 'Monthdays') {
          rule = `every year in ${months.join(' and ')} on ${monthdays.join(' and ')}`
        }
      }
    }
    if (end) {
      if (endpattern === 'EndDate') {
        rule = rule + ` until ${enddate.toDateString()}`
      } else if (endpattern === 'Count') {
        rule = rule + ` for ${count} time ${count > 1 ? 's' : ''}`
      }
    }
    rule = this.recurrenceServise.RRuleGenerator(frequency, interval,end, daysOfWeek, monthlypatterns, monthdays, weekdays, nth, months, endpattern, count, enddate)
    this.recurrenceRules.push(rule)
    this.newRrule.set(false)
    this.transactionForm.removeControl('rrule')
    this.endSubs()
  }

  endSubs() {
    this.endPatternSubscription?.unsubscribe()
    this.endSubscription?.unsubscribe()
    this.frequencySubscription?.unsubscribe()
    this.monthlyPatternSubscription?.unsubscribe()
  }

  deleteRule(rule: string) {
    this.recurrenceRules = this.recurrenceRules.filter((rrule) => rrule !== rule)
  }

  submitTransaction() {
    if (!this.data?.id) {
      if (this.type === 'income') {
        let newIncome: income = {
          Title: this.transactionForm.get('title')?.value,
          Amount: this.transactionForm.get('amount')?.value,
          Date: this.focusflowService.DateToString(this.transactionForm.get('date')?.value),
          Recurrence: undefined,
          Left: 0
        }
        if (this.transactionForm.get('recurring')?.value === true) {
          const newRecurringIncome: recurringIncome = {
            Title: this.transactionForm.get('title')?.value,
            Amount: this.transactionForm.get('amount')?.value,
            RecurrenceRule: this.recurrenceRules.join('\n')
          }
          this.recurrenceServise.addIncome(newRecurringIncome).subscribe((response) => {
            newIncome = { ...newIncome, Recurrence: response.id };
            this.store.dispatch(AddIncome({ income: newIncome }))
            console.log(newIncome)
            console.log(response)
          })
        } else {
          this.store.dispatch(AddIncome({ income: newIncome }))
          console.log(newIncome)
        }
      } else if (this.type === 'payment') {
        let newPayment: payment = {
          Title: this.transactionForm.get('title')?.value,
          Amount: this.transactionForm.get('amount')?.value,
          Date: this.focusflowService.DateToString(this.transactionForm.get('date')?.value),
          Recurrence: undefined,
          Paid: false,
          Priority: this.transactionForm.get('priority')?.value || "MEDIUM"
        }
        if (this.transactionForm.get('recurring')?.value === true) {
          const newRecurringPayment: recurringPayment = {
            Title: this.transactionForm.get('title')?.value,
            Amount: this.transactionForm.get('amount')?.value,
            RecurrenceRule: this.recurrenceRules.join('\n')
          }
          this.recurrenceServise.addPayment(newRecurringPayment).subscribe((response) => {
            newPayment = { ...newPayment, Recurrence: response.id };
            this.store.dispatch(AddPayment({ payment: newPayment }))
            console.log(newPayment)
            console.log(response)
          })
        } else {
          this.store.dispatch(AddPayment({ payment: newPayment }))
          console.log(newPayment)
        }
      }
    }
    if (this.data?.id) {
    let editingId = this.data.id
      if (this.type === "income" && 'Recurrence' in this.data && 'Left' in this.data) {
        let editedIncome: income = {
          id: editingId,
          Title: this.transactionForm.get('title')?.value,
          Amount: this.transactionForm.get('amount')?.value,
          Date: this.focusflowService.DateToString(this.transactionForm.get('date')?.value),
          Recurrence: this.data.Recurrence,
          Left: this.data.Left
        }
        if (this.transactionForm.get('recurring')?.value === true) {
          const newRecurringIncome: recurringIncome = {
            Title: this.transactionForm.get('title')?.value,
            Amount: this.transactionForm.get('amount')?.value,
            RecurrenceRule: this.recurrenceRules.join('\n')
          }
          this.recurrenceServise.addIncome(newRecurringIncome).subscribe((response) => {
            editedIncome = { ...editedIncome, Recurrence: response.id };
            this.store.dispatch(EditIncome({ income: editedIncome }))
            console.log(editedIncome)
            console.log(response)
          })
        } else {
          this.store.dispatch(EditIncome({ income: editedIncome }))
          console.log(editedIncome)
        }
      }
      if (this.type === "recurringIncome") {
        const editedRecurringIncome: recurringIncome = {
          Title: this.transactionForm.get('title')?.value,
          Amount: this.transactionForm.get('amount')?.value,
          RecurrenceRule: this.recurrenceRules.join('\n')
        }
        this.recurrenceServise.editRIncome(editingId.toString(),editedRecurringIncome).subscribe((response) => console.log(response))
      }
      if ('Paid' in this.data) {
        let editedPayment: payment = {
          id: editingId,
          Title: this.transactionForm.get('title')?.value,
          Amount: this.transactionForm.get('amount')?.value,
          Date: this.focusflowService.DateToString(this.transactionForm.get('date')?.value),
          Paid: this.data.Paid,
          Priority: this.transactionForm.get('priority')?.value,
          Recurrence: this.data.Recurrence
        }
        if (this.transactionForm.get('recurring')?.value === true) {
          const newRecurringPayment: recurringPayment = {
            Title: this.transactionForm.get('title')?.value,
            Amount: this.transactionForm.get('amount')?.value,
            RecurrenceRule: this.recurrenceRules.join('\n')
          }
          this.recurrenceServise.addPayment(newRecurringPayment).subscribe((response) => {
            editedPayment = { ...editedPayment, Recurrence: response.id };
            this.store.dispatch(EditPayment({ payment: editedPayment }))
            console.log(editedPayment)
            console.log(response)
          })
        } else {
          this.store.dispatch(EditPayment({ payment: editedPayment }))
          console.log(editedPayment)
        }
      }
      if (this.type === "recurringPayment") {
        const editedRecurringPayment: recurringPayment = {
          Title: this.transactionForm.get('title')?.value,
          Amount: this.transactionForm.get('amount')?.value,
          RecurrenceRule: this.recurrenceRules.join('\n')
        }
        this.recurrenceServise.editRPayment(editingId.toString(),editedRecurringPayment).subscribe((response) => console.log(response))
      }
    }
    this.closeDialog()
  }

  closeDialog(){
    this.ref.close()
  }
}
