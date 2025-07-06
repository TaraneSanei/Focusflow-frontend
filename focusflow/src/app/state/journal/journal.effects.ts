import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FocusflowService } from "../../focusflow.service";
import { inject, Injectable } from "@angular/core";
import { AddJournalEntry, AddJournalEntryFailure, AddJournalEntrySuccess, DeleteJournalEntry, DeleteJournalEntryFailure, DeleteJournalEntrySuccess, EditJournalEntry, EditJournalEntryFailure, EditJournalEntrySuccess, LoadJournal, LoadJournalFailure, LoadJournalSuccess } from "./journal.actions";
import { catchError, from, map, mergeMap, of } from "rxjs";

@Injectable()
export class JournalEffects {
    private actions$ = inject (Actions);
    private focusflowService = inject (FocusflowService);
    
    constructor(){}

    loadjournal$ = createEffect(()=>
    this.actions$.pipe(
        ofType(LoadJournal),
        mergeMap((action) => 
        from(this.focusflowService.getJournal(action.url)).pipe(
            map((response) => LoadJournalSuccess({journalEntries:response.results, next: response.next, previous: response.previous})),
            catchError((error) => of(LoadJournalFailure({error})))
        ))));

    addJournal$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AddJournalEntry),
            mergeMap((action) => 
            from(this.focusflowService.addJournal(action.journalEntry)).pipe(
                map((JournalEntry)=> AddJournalEntrySuccess({journalEntry: JournalEntry})),
                catchError((error) => of(AddJournalEntryFailure({error})))
            ))));

    editJournal$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EditJournalEntry),
            mergeMap((action) =>
            from (this.focusflowService.editJournal(action.journalEntry)).pipe(
                map((JournalEntry) => EditJournalEntrySuccess({journalEntry: JournalEntry})),
                catchError((error) => of(EditJournalEntryFailure({error: error})))
            ))));
    
    deleteJournal$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DeleteJournalEntry),
            mergeMap((action)=>
            from(this.focusflowService.deleteJournal(action.journalEntry)).pipe(
                map(() => DeleteJournalEntrySuccess({journalEntry: action.journalEntry})),
                catchError((error) => of(DeleteJournalEntryFailure({error: error})))
            ))
        ))
}