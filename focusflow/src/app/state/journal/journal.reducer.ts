import { JournalEntry } from "../../models/data.models";
import { createReducer, on } from "@ngrx/store";
import { AddJournalEntry, AddJournalEntryFailure, AddJournalEntrySuccess, DeleteJournalEntry, DeleteJournalEntryFailure, DeleteJournalEntrySuccess, EditJournalEntry, EditJournalEntryFailure, EditJournalEntrySuccess, LoadJournal, LoadJournalFailure, LoadJournalSuccess } from "./journal.actions";

export interface JournalState {
    journalEntries: JournalEntry[];
    next: string | null;
    previous: string | null;
    error: string;
    status: "pending" | "loading" | "error" | "success";
};

export const initialJournalState: JournalState = {
    journalEntries: [],
    previous: null,
    next: null,
    error: "",
    status: 'pending',
};

export const JournalReducer = createReducer(
    initialJournalState,
    on(LoadJournal, (state) => ({
        ...state,
        status: "loading" as "loading"
    })),
    on(LoadJournalSuccess, (state, { journalEntries, previous, next }) => ({
        ...state,
        journalEntries: [...state.journalEntries, ...journalEntries.filter((journal) => !state.journalEntries.some(Existingjournal => Existingjournal.id === journal.id))],
        next: next,
        previous: previous,
        status: "success" as "success",
    })),
    on(LoadJournalFailure, (state, { error }) => ({
        ...state,
        status: "error" as "error",
        error: error
    })),
    on(AddJournalEntry, (state) => ({
        ...state,
        error: "",
        status: "loading" as "loading"
    })),
    on(AddJournalEntrySuccess, (state, { journalEntry }) => ({
        ...state,
        journalEntries: [
            ...state.journalEntries, journalEntry
        ].sort((a, b) => new Date(b.DateTime).getTime() - new Date(a.DateTime).getTime()),
        status: "success" as "success",
        error: ""
    })),
    on(AddJournalEntryFailure, (state, { error }) => ({
        ...state,
        status: "error" as "error",
        error: error
    })),
    on(EditJournalEntry, (state, { journalEntry }) => ({
        ...state,
        error: "",
        status: "loading" as "loading"
    })),
    on(EditJournalEntrySuccess, (state, { journalEntry }) => ({
        ...state,
        journalEntries: state.journalEntries.map((JournalEntry) =>
            JournalEntry.id === journalEntry.id
                ? {
                    id: journalEntry.id,
                    Note: journalEntry.Note,
                    Energy: journalEntry.Energy,
                    Noise: journalEntry.Noise,
                    Motivation: journalEntry.Motivation,
                    EmotionalStatus: journalEntry.EmotionalStatus,
                    DateTime: journalEntry.DateTime
                }
                : JournalEntry
        ),
        status: "success" as "success",
        error: ""
    })),
    on(EditJournalEntryFailure, (state, { error }) => ({
        ...state,
        status: "error" as "error",
        error: error
    })),
    on(DeleteJournalEntry, (state, {journalEntry}) => ({
        ...state,
        error: "",
        status: "loading" as "loading"
    })),
    on(DeleteJournalEntrySuccess, (state, { journalEntry }) => ({
        ...state,
        journalEntries: state.journalEntries.filter((JournalEntry) => JournalEntry.id !== journalEntry.id),
        status: "success" as "success",
        error: ""
        
    })),
    on(DeleteJournalEntryFailure, (state, { error }) => ({
        ...state,
        status: "error" as "error",
        error: error
    }))

);