import { TreeNode } from "primeng/api";


export interface JournalEntry {
    id?: number;
    DateTime: Date;
    EmotionalStatus: emotion[];
    Energy: number;
    Motivation: number;
    Noise: number;
    Note: string;
} 

export interface emotion{
    Emotion: string;
    Color:string;
}

export interface income {
    id?: number;
    Title: string;
    Amount: number;
    Date: string;
    Recurrence?: number;
    Left: number
}

export enum priority {
    "Urgent" = "URGENT",
    "High" = "HIGH",
    "Medium" = "MEDIUM",
    "Low" = "LOW",
    "Unnecessary" = "UNNECESSARY"
}

export interface payment {
    id?: number;
    Title: string;
    Amount: number;
    Date: string;
    Recurrence?: number; 
    Paid: boolean;
    Priority: priority
}


export interface recurringPayment{
    id?: number;
    Title: string;
    Amount: number;
    RecurrenceRule: string;
}

export interface recurringIncome{
    id?: number;
    Title: string;
    Amount: number;
    RecurrenceRule: string;
}

export interface budget {
    id?:number;
    Title: string;
    Color: string;
    Amount: number;
}

export interface category {
    id?:number;
    Title : string;
    Description? : string;
    Color : string;
    ParentCategory? : number;
    key: string;
}


export interface project {
    id?:number;
    Title: string;
    Description?: string;
    DueDate?: Date
    BackBurner: boolean;
    Priority: priority;
    Color: string;
    ParentCategory?: number;
    Reward?: string;
    key: string;
}

export interface task {
    id?: number;
    Title: string;
    Description?: string;
    DueDate?: Date;
    DueTime?: time;
    Date?: Date;
    Time?: time;
    Duration?: number;
    Priority: priority;
    Done: boolean;
    Recurrence?: number;
    ParentCategory?: number;
    ParentProject?: number;
    PointUnit?: string;
    Points?: number;
    key: string;
}

export interface recurringTask {
    id?: number;
    Title: string;
    Description?: string;
    RecurrenceRule: string;
    Duration?: number;
    Priority: priority;
    ParentCategory?: number;
    ParentProject?: number;
    PointUnit?: string;
    Points?: number;
    key: string;
}

export interface subtask {
    id?: number;
    Title: string;
    Description?: string;
    DueDate?: Date;
    DueTime?: time;
    Date?: Date;
    Time?: time;
    Duration?: number;
    Priority: priority;
    Done: boolean;
    Recurrence?: number;
    ParentTask: number;
    Points?: number;
    PointUnit?: string;
    key: string;

}

export interface recurringSubtask {
    id?: number;
    Title: string;
    Description?: string;
    RecurrenceRule: string;
    Duration?: number;
    Priority: priority;
    ParentTask: number;
    Points?: number;
    PointUnit?: string;
    key: string;

}

export interface time {
    hour: number;
    minute: number;
}

export interface event {
    id?: number;
    Title: string;
    Description: string;
    Date?: Date;
    Time?: time;
    Duration?: number;
    Priority: priority;
    Location?: string;
    Recurrence?: number;
    Done: boolean;
    ParentCategory?: number;
    ParentProject?: number;
    PointUnit?: string;
    Points?: number;
    key: string;
}


export interface recurringEvent {
    id?: number;
    Title: string;
    Description: string;
    RecurrenceRule: string;
    Duration?: number;
    Priority: priority;
    Location?: string;
    ParentCategory?: number;
    ParentProject?: number;
    PointUnit?: string;
    Points?: number;
    key: string;
}

