import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, from, map, catchError, of } from "rxjs";
import { FocusflowService } from "../../../focusflow.service";
import { LoadTasks, LoadTasksSuccess, LoadTasksFailure, AddTask, AddTaskFailure, AddTaskSuccess, DeleteTask, DeleteTaskFailure, DeleteTaskSuccess, EditTask, EditTaskFailure, EditTaskSuccess } from "./task.actions";

@Injectable()
export class TasksEffects {
        private actions$ = inject (Actions);
        private focusflowService = inject (FocusflowService);
        

    loadTasks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoadTasks),
            mergeMap((action) =>
            from(this.focusflowService.getTasks()).pipe(
                map((response) => LoadTasksSuccess({tasks: response})),
                catchError((error)=> of(LoadTasksFailure({error: error})))
            ))));

    addTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AddTask),
            mergeMap((action) =>
                from(this.focusflowService.addTask(action.task)).pipe(
                    map((response) => AddTaskSuccess({ task: response })),
                    catchError((error) => of(AddTaskFailure({ error: error })))
                )
            )
        )
    );

    
    
    deleteTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DeleteTask),
            mergeMap((action) =>
                from(this.focusflowService.deleteTask(action.task)).pipe(
                    map(() => DeleteTaskSuccess({ task: action.task })),
                    catchError((error) => of(DeleteTaskFailure({ error: error })))
                ))));

    editTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EditTask),
            mergeMap((action) =>
                from(this.focusflowService.editTask(action.task)).pipe(
                    map(() => EditTaskSuccess({ task: action.task })),
                    catchError((error) => of(EditTaskFailure({ error: error })))
                ))))
}