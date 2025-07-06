import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { recurringIncome, recurringPayment } from '../models/data.models';

@Injectable({
  providedIn: 'root'
})
export class RecurrenceService {


  private apiURL = environment.apiUrl;

  constructor(private httpclient: HttpClient) { }

  RRuleGenerator(frequency: string, interval: number,end:boolean, daysOfWeek?: string[], monthlyPattern?: string, monthdays?: string[], weekdays?: string[], nth?: string, months?: string[], endpattern?: string, count?: number, enddate?: Date) {
    let freq = frequency.toUpperCase()
    let rrule: string = `RRULE:FREQ=${freq};INTERVAL=${interval}`
    if (freq === 'WEEKLY') {
      rrule = `${rrule};BYDAY=${daysOfWeek?.join(',')}`
      }
    if (freq === 'MONTHLY') {
      if (monthlyPattern === 'Monthdays') {
        rrule = `${rrule};BYMONTHDAY=${monthdays}`
      } else if (monthlyPattern === 'Weekdays') {
        const ByDay = weekdays?.map(day => `${nth}${day}`).join(',');
        rrule = `${rrule};BYDAY=${ByDay}`
      }
    }
    if (freq === 'YEARLY') {
      rrule = `${rrule};BYMONTH=${months?.join(',')}`
      if (monthlyPattern === 'Monthdays') {
        rrule = `${rrule};BYMONTHDAY=`
        monthdays?.forEach((day) => {
          rrule = `${rrule}${day}`
        })
      } else if (monthlyPattern === 'Weekdays') {
        const ByDay = weekdays?.map(day => `${nth}${day}`).join(',');
        rrule = `${rrule};BYDAY=${ByDay}`
      }
    }
    if(end){
      if(endpattern === 'Count'){
        rrule = `${rrule};COUNT=${count}`
      } else if (endpattern === 'EndDate') {
        rrule = `${rrule};UNTIL=${enddate?.toISOString().replaceAll('-','').replaceAll(':','').replaceAll('.','')}`
      }
    }
    return rrule
  }

  deleteRIncome(id: string) {
    return this.httpclient.delete<recurringIncome>(this.apiURL + 'money/ri/' + id)
  }

  deleteRPayment(id: string) {
    return this.httpclient.delete<recurringPayment>(this.apiURL + 'money/rp/' + id)
  }

  getRIncome(id: string) {
    return this.httpclient.get<recurringIncome>(this.apiURL + 'money/ri/' + id)
  }

  getRPayment(id: string) {
    return this.httpclient.get<recurringPayment>(this.apiURL + 'money/rp/' + id)
  }
  
  editRIncome(id: string, RIncome: recurringIncome) {
    return this.httpclient.put<recurringIncome>(this.apiURL + 'money/ri/' + id, RIncome)
  }

  editRPayment(id: string, RPayment: recurringPayment) {
    return this.httpclient.put<recurringPayment>(this.apiURL + 'money/rp/' + id, RPayment)
  }

  addIncome(RIncome: recurringIncome) {
    console.log(RIncome)
    return this.httpclient.post<recurringIncome>(this.apiURL + 'money/ri', RIncome)
  }

  addPayment(RPayment: recurringPayment) {
    return this.httpclient.post<recurringIncome>(this.apiURL + 'money/rp', RPayment)
  }

}
