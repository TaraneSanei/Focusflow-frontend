import { createAction, props } from "@ngrx/store";
import { JournalEntry } from "../../models/data.models";

//load journals with endless scrolling actions
export const LoadJournal = createAction(
    '[backend] load journal',
    props<{ url: string | null}>()
);

export const LoadJournalSuccess = createAction(
    '[backend] load journal success',
    props<{ journalEntries: JournalEntry[], next: string, previous: string }>()
);

export const LoadJournalFailure = createAction(
    '[backend] load journal failure',
    props<{ error: string }>()
);

//add a new journal note actions

export const AddJournalEntry = createAction(
    '[backend] add journal entry',
    props<{journalEntry: JournalEntry}>()
);

export const AddJournalEntrySuccess = createAction(
    '[backend] add journal entry success',
    props<{journalEntry: JournalEntry}>()
);

export const AddJournalEntryFailure = createAction(
    '[backend] add journal entry failure',
    props<{error: string}>()
);

//Edit journal actions

export const EditJournalEntry = createAction(
    '[backend] edit journal entry',
    props<{journalEntry: JournalEntry}>()
);

export const EditJournalEntrySuccess = createAction(
    '[backend] edit journal entry success',
    props<{journalEntry: JournalEntry}>()
);

export const EditJournalEntryFailure = createAction(
    '[backend] edit journal entry failure',
    props<{error: string}>()
);

//delete journal actions

export const DeleteJournalEntry = createAction(
    '[backend] delete journal entry',
    props<{journalEntry: JournalEntry}>()
);

export const DeleteJournalEntrySuccess = createAction(
    '[backend] delete journal entry success',
    props<{journalEntry: JournalEntry}>()
);

export const DeleteJournalEntryFailure = createAction(
    '[backend] delete journal entry failure',
    props<{error: string}>()
);
