import { Component, HostListener, Signal, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { selectJournal, selectNext } from '../state/journal/journal.selector';
import { AddJournalEntry, DeleteJournalEntry, EditJournalEntry, LoadJournal } from '../state/journal/journal.actions';
import { Observable } from 'rxjs';
import { emotion, JournalEntry } from '../models/data.models';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FluidModule } from 'primeng/fluid';
import { SliderModule } from 'primeng/slider';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MultiSelectModule } from 'primeng/multiselect';
import { LoadEmotions } from '../state/emotion/emotion.actions';
import { selectEmotion } from '../state/emotion/emotion.selector';


@Component({
  selector: 'app-journal',
  imports: [
    CardModule,
    CommonModule,
    DatePickerModule,
    FormsModule,
    TextareaModule,
    IftaLabelModule,
    ButtonModule,
    InputIconModule,
    ConfirmDialogModule,
    ToastModule,
    FluidModule,
    SliderModule,
    InputNumberModule,
    InputGroupAddonModule,
    InputGroupModule,
    IconFieldModule,
    FloatLabelModule,
    MultiSelectModule
  ],
  providers: [
    ConfirmationService, MessageService
  ],
  templateUrl: './journal.component.html',
  styleUrl: './journal.component.css'
})
export class JournalComponent {
  emotions! : Signal<emotion[]>
  journal$: Observable<JournalEntry[]>
  next$: Observable<string | null>

  newJournal: JournalEntry = {
    DateTime: new Date,
    Energy: 0,
    Noise: 0,
    Motivation: 0,
    EmotionalStatus: [],
    Note: ""
  }

  editing = signal<number | undefined>(undefined)

  edittableJournal: JournalEntry = {
    id: undefined,
    DateTime: new Date,
    Energy: 0,
    Noise: 0,
    Motivation: 0,
    EmotionalStatus: [],
    Note: ""
  }

  constructor(private store: Store<AppState>, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.store.dispatch(LoadJournal({ url: null }));
    this.journal$ = this.store.select(selectJournal)
    this.next$ = this.store.select(selectNext)
    this.store.dispatch(LoadEmotions())
    this.emotions = this.store.selectSignal(selectEmotion)
  }

  @HostListener("window:scroll", [])
  onScroll(event: any) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) {
      this.loadMoreEntries();
    }
  }

  buildGradient(emotions: emotion[]): string{
    if (emotions.length > 0) {
      return 'linear-gradient(60deg,'+ emotions.map(e => e.Color).join(' ,') +')'
      } else{
      return '#94A3B8'
    } 
  }

  loadMoreEntries() {
    console.log("scrolling")
    let nextUrl: string | null = null;
    this.next$.subscribe((url) =>
      nextUrl = url);
    if (nextUrl != null) {
      this.store.dispatch(LoadJournal({ url: nextUrl }))
    }
  }

  Addjournal() {
    console.log(this.newJournal.DateTime)
    this.store.dispatch(AddJournalEntry({ journalEntry: this.newJournal }))
    this.newJournal = {
      DateTime: new Date(),
      Energy: 0,
      Noise: 0,
      Motivation: 0,
      EmotionalStatus: [],
      Note: ""
    }
  }

  toggleEdit(journal: JournalEntry) {
    if(!this.editing()){
      this.editing.set(journal.id)
      this.edittableJournal = {
        Note: journal.Note,
        id: journal.id,
        DateTime: new Date(journal.DateTime),
        Energy: journal.Energy,
        Noise: journal.Noise,
        Motivation: journal.Motivation,
        EmotionalStatus: journal.EmotionalStatus,
      }
    } else {
      this.editing.set(undefined)
    }
  }


  Editjournal(journal: JournalEntry) {
    this.store.dispatch(EditJournalEntry({ journalEntry: this.edittableJournal }))
    this.editing.set(undefined)
    this.edittableJournal = {
      id: undefined,
      DateTime: new Date,
      Energy: 0,
      Noise: 0,
      Motivation: 0,
      EmotionalStatus: [],
      Note: ""
    }
  }


  deleteJournal(event: Event, journal: JournalEntry) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this journal?',
      header: 'Journals are your story',
      icon: 'pi pi-trash',
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
        this.store.dispatch(DeleteJournalEntry({ journalEntry: journal }));
      },
      reject: () => { },
    });
  }

  
}

