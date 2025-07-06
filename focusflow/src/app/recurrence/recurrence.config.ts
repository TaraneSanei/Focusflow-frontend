import { Validators, ValidatorFn, ValueChangeEvent } from "@angular/forms";


export interface RecurrenceConfig {
    controls: string[];
    initialValues?: { [controlName: string]: any | ((context: { date: Date }) => any) };
    validators?: {[controlName: string]: ValidatorFn[]}
}

export const recurrenceConfig: { [frequency: string]: RecurrenceConfig } = {
    DAILY: {
        controls: [],
    },
    WEEKLY: {
        controls: ['daysOfWeek'],
        initialValues: {
            daysOfWeek: ({ date }: { date: Date }) => {
                return [DaysOfWeek[date.getDay()].value]
            }
        },
        validators: {
            daysOfWeek: [Validators.required]
        }
    },
    MONTHLY: {
        controls: ['monthlyPattern', 'monthdays', 'weekdays', 'nth'],
        initialValues: {
            monthlyPattern: 'Monthdays',
            monthdays: ({ date }: { date: Date }) => {
                return [Monthdays[date.getDate()-1].value]
            },
            weekdays: ({date} : {date: Date}) =>{
                return [DaysOfWeek[date.getDay()].value]
            },
            nth: '1'
        },
        validators: {
            monthlyPattern : [Validators.required],
            monthdays: [Validators.required, Validators.min(-5), Validators.max(31)],
            weekdays: [Validators.required],
            nth: [Validators.required]
        }

    },
    YEARLY: {
        controls: ['months', 'monthlyPattern', 'monthdays', 'weekdays', 'nth'],
        initialValues: {
            months: ({ date }: { date: Date }) => {
                return [Months[date.getMonth()].value]
            },
            monthlyPattern: 'Monthdays',
            monthdays: ({ date }: { date: Date }) => {
                return [Monthdays[date.getDate()-1].value]
            },
            weekdays: ({date} : {date: Date}) =>{
                return [DaysOfWeek[date.getDay()].value]
            },
            nth: '1'
        },
        validators: {
            months: [Validators.required],
            monthdays: [Validators.required, Validators.min(-5), Validators.max(31)],
            weekdays: [Validators.required],
            nth: [Validators.required]
        }
    }
}


export const DaysOfWeek = [
    { label: 'Su', value: 'SU' },
    { label: 'Mo', value: 'MO' },
    { label: 'Tu', value: 'TU' },
    { label: 'We', value: 'WE' },
    { label: 'Th', value: 'TH' },
    { label: 'Fr', value: 'FR' },
    { label: 'Sa', value: 'SA' },
]


export const Months = [
    { label: 'Jan', value: '1' },
    { label: 'Feb', value: '2' },
    { label: 'Mar', value: '3' },
    { label: 'Apr', value: '4' },
    { label: 'May', value: '5' },
    { label: 'Jun', value: '6' },
    { label: 'Jul', value: '7' },
    { label: 'Aug', value: '8' },
    { label: 'Sep', value: '9' },
    { label: 'Oct', value: '10' },
    { label: 'Nov', value: '11' },
    { label: 'Dec', value: '12' },
]

export const FrequencyValues = [
    { label: 'day(s)', value: 'DAILY' },
    { label: 'week(s)', value: 'WEEKLY' },
    { label: 'month(s)', value: 'MONTHLY' },
    { label: 'year(s)', value: 'YEARLY' }
]

export const MonthlyPatterns: string[] = ['Monthdays', 'Weekdays']
export const Monthdays = [
    {label: '1', value: '1'}, 
    {label:'2', value: '2'},
    {label:'3', value: '3'}, 
    {label:'4', value: '4'}, 
    {label:'5', value: '5'}, 
    {label:'6', value: '6'}, 
    {label:'7', value: '7'}, 
    {label:'8', value: '8'}, 
    {label:'9', value: '9'}, 
    {label:'10', value: '10'}, 
    {label:'11', value: '11'}, 
    {label:'12', value: '12'}, 
    {label:'13', value: '13'}, 
    {label:'14', value: '14'}, 
    {label:'15', value: '15'}, 
    {label:'16', value: '16'}, 
    {label:'17', value: '17'}, 
    {label:'18', value: '18'}, 
    {label:'19', value: '19'}, 
    {label:'20', value: '20'}, 
    {label:'21', value: '21'}, 
    {label:'22', value: '22'}, 
    {label:'23', value: '23'}, 
    {label:'24', value: '24'}, 
    {label:'25', value: '25'}, 
    {label:'26', value: '26'}, 
    {label:'27', value: '27'}, 
    {label:'28', value: '28'}, 
    {label:'29', value: '29'}, 
    {label:'30', value: '30'}, 
    {label:'31', value: '31'},
    {label:'-1', value: '-1'},
    {label:'-2', value: '-2'},
    {label:'-3', value: '-3'},
    {label:'-4', value: '-4'},

]
export const Nth = [
    {label: '1st', value: '1'}, 
    {label: '2nd', value: '2'}, 
    {label: '3rd', value: '3'}, 
    {label:'4th', value: '4'}, 
    {label: 'last', value: '-1'}]


    export const endConfig: { [endPattern: string]: RecurrenceConfig } = {
        end: {
        controls: ['endPattern', 'endDate', 'count'],
        initialValues: {
            endPattern: 'Count',
            count: 1,
            endDate: ''
        },
        validators: {
            endPattern : [Validators.required],
            count: [Validators.required, Validators.min(1)],
            endDate: [Validators.required],
        }
    }
    }