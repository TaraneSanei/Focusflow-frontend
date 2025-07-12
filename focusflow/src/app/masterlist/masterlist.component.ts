import { Component, effect, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { category, event, project, recurringEvent, recurringSubtask, recurringTask, subtask, task } from '../models/data.models';
import { AppState } from '../state/app.state';
import { Store } from '@ngrx/store';
import { LoadCategories } from '../state/masterlist/category/category.actions';
import { selectCategories } from '../state/masterlist/category/category.selector';
import { CommonModule } from '@angular/common';
import { TreeTableModule } from 'primeng/treetable';
import { ButtonModule } from 'primeng/button';
import { selectProjects } from '../state/masterlist/project/project.selector';
import { LoadProjects } from '../state/masterlist/project/project.actions';
import { LoadTasks } from '../state/masterlist/task/task.actions';
import { LoadSubtasks } from '../state/masterlist/subtask/subtask.actions';
import { LoadEvents } from '../state/masterlist/event/event.actions';
import { selectTasks } from '../state/masterlist/task/task.selector';
import { selectSubtasks } from '../state/masterlist/subtask/subtask.selector';
import { selectEvents } from '../state/masterlist/event/event.selector';
import { MenuItem, TreeNode } from 'primeng/api';
import { SpeedDialModule } from 'primeng/speeddial';
import { LoadRecurringEvents } from '../state/masterlist/recurringEvent/recurringEvent.actions';
import { LoadRecurringSubtasks } from '../state/masterlist/recurringSubtask/recurringSubtask.actions';
import { LoadRecurringTasks } from '../state/masterlist/recurringTask/recurringTask.actions';
import { selectRecurringEvents } from '../state/masterlist/recurringEvent/recurringEvent.selector';
import { selectRecurringSubtasks } from '../state/masterlist/recurringSubtask/recurringSubtask.selector';
import { selectRecurringTasks } from '../state/masterlist/recurringTask/recurringTask.selector';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuModule } from 'primeng/menu';


@Component({
  selector: 'app-masterlist',
  imports: [
    CommonModule,
    TreeTableModule,
    ButtonModule,
    SpeedDialModule,
    SplitButtonModule,
    MenuModule
  ],
  templateUrl: './masterlist.component.html',
  styleUrl: './masterlist.component.css'
})
export class MasterlistComponent {

  isMobile = false;
  categories = signal<category[]>([])
  projects = signal<project[]>([])
  tasks = signal<task[]>([])
  subtasks = signal<subtask[]>([])
  events = signal<event[]>([])
  recurringTasks = signal<recurringTask[]>([])
  recurringSubtasks = signal<recurringSubtask[]>([])
  recurringEvents = signal<recurringEvent[]>([])
  masterlistNode: TreeNode<category | project | task | subtask | event | recurringTask | recurringSubtask | recurringEvent>[] = [];
  hoveredRow: TreeNode<any> | null = null;
  processedNodes = new Set<string>();


  constructor(private store: Store<AppState>, private breakpoint: BreakpointObserver) {

    this.breakpoint.observe([Breakpoints.Handset])
      .subscribe(res => this.isMobile = res.matches);
    effect(() => {
      this.store.dispatch(LoadCategories());
      this.store.dispatch(LoadProjects());
      this.store.dispatch(LoadTasks());
      this.store.dispatch(LoadSubtasks());
      this.store.dispatch(LoadEvents())
      this.store.dispatch(LoadRecurringTasks());
      this.store.dispatch(LoadRecurringSubtasks());
      this.store.dispatch(LoadRecurringEvents());
    });
    effect(() => {
      const categoriesData = this.store.selectSignal(selectCategories)
      this.categories.set(categoriesData())
      const projectsData = this.store.selectSignal(selectProjects)
      this.projects.set(projectsData())
      const tasksData = this.store.selectSignal(selectTasks)
      this.tasks.set(tasksData())
      const subtasksData = this.store.selectSignal(selectSubtasks)
      this.subtasks.set(subtasksData())
      const eventsData = this.store.selectSignal(selectEvents)
      this.events.set(eventsData())
      const recurringTasksData = this.store.selectSignal(selectRecurringTasks)
      this.recurringTasks.set(recurringTasksData())
      const recurringSubtasksData = this.store.selectSignal(selectRecurringSubtasks)
      this.recurringSubtasks.set(recurringSubtasksData())
      const recurringEventsData = this.store.selectSignal(selectRecurringEvents)
      this.recurringEvents.set(recurringEventsData())
      this.events.set(eventsData())
      this.buildMasterlist();
      console.log(this.masterlistNode);
    })
  }


  buildMasterlist() {
    this.masterlistNode = [];
    this.processedNodes.clear();
    this.categories().forEach(c => this.makeNode(c))
    this.projects().forEach(c => this.makeNode(c))
    this.tasks().forEach(c => this.makeNode(c))
    this.subtasks().forEach(c => this.makeNode(c))
    this.events().forEach(c => this.makeNode(c))
    this.recurringTasks().forEach(c => this.makeNode(c))
    this.recurringSubtasks().forEach(c => this.makeNode(c))
    this.recurringEvents().forEach(c => this.makeNode(c))
    console.log(this.processedNodes)
  }


  //recursive function to build the tree structure, my pride and joy
  makeNode(n: category | project | task | subtask | event | recurringTask | recurringSubtask | recurringEvent) {
    const key = this.getNodeKey(n);
    if (this.processedNodes.has(key)) {
      return; // already processed
    }
    this.processedNodes.add(key);
    if ('ParentTask' in n && !('RecurrenceRule' in n)) {
      // Only access Recurrence if n is a subtask (not recurringSubtask)
      if (!('Recurrence' in n) || n.Recurrence === null) {
        const nodeN: TreeNode<subtask> = {
          label: n.Title,
          type: 'subtask',
          data: n,
          children: [],
          icon: "pi pi-ticket"
        }
        if (n!.ParentTask! !== null) {
          const p = this.tasks().find(t => t.id === n.ParentTask)
          if (!this.masterlistNode.find(treenode => treenode.data === p!)) {
            this.makeNode(p!)
          }
          this.masterlistNode.find(treenode => treenode.data === p!)?.children?.push(nodeN)

        }
      }
    } else if ('ParentTask' in n && 'RecurrenceRule' in n) { //adding recurring subtasks
    // Only access Recurrence if n is a recurringSubtask (not subtask)
    const nodeN: TreeNode<recurringSubtask> = {
        label: n.Title + ' (Recurring)',
        type: 'recurringSubtask',
        data: n,
        children: [],
        icon: "pi pi-ticket"
    }
    if (n!.ParentTask! !== null) {
        const p = this.tasks().find(t => t.id === n.ParentTask)
        if (!this.masterlistNode.find(treenode => treenode.data === p!)) {
            this.makeNode(p!)
        }
        this.parentify(nodeN, p!, this.masterlistNode);
    }
} else if ('ParentCategory' in n && 'ParentProject' in n && !('Location' in n) && !('RecurrenceRule' in n)) {
      if (!('Recurrence' in n) || n.Recurrence === null) {
        const nodeN: TreeNode<task> = {
          label: n.Title,
          type: 'task',
          data: n,
          children: [],
          icon: "pi pi-receipt"

        }
        if (n.ParentCategory !== null) {
          const p = this.categories().find(t => t.id === n.ParentCategory)
          if (!this.masterlistNode.find(treenode => treenode.data === p!)) {
            this.makeNode(p!)
          }
          this.masterlistNode.find(treenode => treenode.data === p!)?.children?.push(nodeN)

        } else if (n.ParentProject !== null) {
          const p = this.projects().find(t => t.id === n.ParentProject)
          if (!this.masterlistNode.find(treenode => treenode.data === p!)) {
            this.makeNode(p!)
          }
        this.parentify(nodeN, p!, this.masterlistNode)

        } else {
          this.masterlistNode.push(nodeN)
        }
      }
      //adding recurring tasks
    } else if ('ParentCategory' in n && 'ParentProject' in n && 'RecurrenceRule' in n && !('Location' in n)) {
      const nodeN: TreeNode<recurringTask> = {
        label: n.Title + ' (Recurring)',
        type: 'recurringTask',
        data: n,
        children: [],
        icon: "pi pi-receipt"

      }
      if (n.ParentCategory !== null) {
        const p = this.categories().find(t => t.id === n.ParentCategory)
        if (!this.masterlistNode.find(treenode => treenode.data === p!)) {
          this.makeNode(p!)
        }
        this.parentify(nodeN, p!, this.masterlistNode)

      } else if (n.ParentProject !== null) {
        const p = this.projects().find(t => t.id === n.ParentProject)
        if (!this.masterlistNode.find(treenode => treenode.data === p!)) {
          this.makeNode(p!)
        }
        this.parentify(nodeN, p!, this.masterlistNode)

      } else {
        this.masterlistNode.push(nodeN)
      }


    } else if ('BackBurner' in n) {
      const nodeN: TreeNode<project> = {
        label: n.Title,
        type: 'project',
        data: n,
        children: [],
        icon: "pi pi-bullseye"

      }
      if (n.ParentCategory !== null) {
        const p = this.categories().find(t => t.id === n.ParentCategory)
        if (!this.masterlistNode.find(treenode => treenode.data === p!)) {
          this.makeNode(p!)
        }
        this.parentify(nodeN, p!, this.masterlistNode)
      } else {
        this.masterlistNode.push(nodeN)
      }
    } else if (!('Priority' in n)) {
      const nodeN: TreeNode<category> = {
        label: n.Title,
        type: 'category',
        data: n,
        children: [],
        icon: "pi pi-folder"
      }
      if (n.ParentCategory !== null) {
        const p = this.categories().find(t => t.id === n.ParentCategory)
        if (!this.masterlistNode.find(treenode => treenode.data === p!)) {
          this.makeNode(p!)
        }
        this.parentify(nodeN, p!, this.masterlistNode)

      } else {
        this.masterlistNode.push(nodeN)
      }
    } else if ('Location' in n && (!('RecurrenceRule' in n))) {
      if (!('Recurrence' in n) || n.Recurrence === null) {
        const nodeN: TreeNode<event> = {
          label: n.Title,
          type: 'event',
          data: n,
          children: [],
          icon: "pi pi-flag"
        }
        if (n.ParentCategory !== null) {
          const p = this.categories().find(t => t.id === n.ParentCategory)
          if (!this.masterlistNode.find(treenode => treenode.data === p!)) {
            this.makeNode(p!)
          }
          this.parentify(nodeN, p!, this.masterlistNode)
        }
        else if (n.ParentProject !== null) {
          const p = this.projects().find(t => t.id === n.ParentProject)
          if (!this.masterlistNode.find(treenode => treenode.data === p!)) {
            this.makeNode(p!)
          }
          this.parentify(nodeN, p!, this.masterlistNode)
        } else {
          this.masterlistNode.push(nodeN)
        }
      }
    } else if ('RecurrenceRule' in n && 'Location' in n) {
      const nodeN: TreeNode<recurringEvent> = {
        label: n.Title + ' (Recurring)',
        type: 'recurringEvent',
        data: n,
        children: [],
        icon: "pi pi-receipt"

      }
      if (n.ParentCategory !== null) {
        const p = this.categories().find(t => t.id === n.ParentCategory)
        if (!this.masterlistNode.find(treenode => treenode.data === p!)) {
          this.makeNode(p!)
        }
        this.parentify(nodeN, p!, this.masterlistNode)

      } else if (n.ParentProject !== null) {
        const p = this.projects().find(t => t.id === n.ParentProject)
        if (!this.masterlistNode.find(treenode => treenode.data === p!)) {
          this.makeNode(p!)
        }
        this.parentify(nodeN, p!, this.masterlistNode)

      } else {
        this.masterlistNode.push(nodeN)
      }
    }

  }

  parentify(n: TreeNode<category | project | task | subtask | event | recurringTask | recurringSubtask | recurringEvent>,
    p: category | project | task | subtask | event | recurringTask | recurringSubtask | recurringEvent,
    treenode: TreeNode<category | project | task | subtask | event | recurringTask | recurringSubtask | recurringEvent>[]
  ) {
    for (const node of treenode) {
      if (node.data === p) {
        if (!node.children) {
          node.children = [];
        }
        node.children.push(n);
        return;
      }
      if (node.children) {
        this.parentify(n, p, node.children);
      }
    }
  }

  getNodeKey(n: any): string {
  if ('Location' in n) return `event-${n.id}`;
  if ('ParentTask' in n && 'RecurrenceRule' in n) return `recurringSubtask-${n.id}`;
  if ('ParentTask' in n && !('RecurrenceRule' in n)) return `subtask-${n.id}`;
  if ('ParentCategory' in n && 'ParentProject' in n && 'RecurrenceRule' in n && !('Location' in n)) return `recurringTask-${n.id}`;
  if ('ParentCategory' in n && 'ParentProject' in n && !('Location' in n) && !('RecurrenceRule' in n)) return `task-${n.id}`;
  if ('BackBurner' in n) return `project-${n.id}`;
  if (!('Priority' in n)) return `category-${n.id}`;
  if ('RecurrenceRule' in n && ('Location' in n)) return `recurringEvent-${n.id}`;
  if ('Location' in n) return `event-${n.id}`;
  return `unknown-${n.id}`;
}



  getMenuItems(node: TreeNode<any>): MenuItem[] {
    const type = node?.type;
    const items: MenuItem[] = [];

    items.push({ label: 'Delete', icon: 'pi pi-trash', command: () => this.delete(node) });
    items.push({ label: 'edit', icon: 'pi pi-cog', command: () => this.openSettings(node) });
    items.push({ label: 'notes', icon: 'pi pi-book', command: () => this.openNotes(node) });
    items.push({ label: 'Add ', icon: 'pi pi-plus', command: () => this.addChild(node) });

    if (['project', 'task', 'subtask'].includes(type ? type : '')) {
      items.push({ label: 'Plan', icon: 'pi pi-calendar-clock', command: () => this.plan(node) });
      items.push({ label: 'Done', icon: 'pi pi-check', command: () => this.markDone(node) });
    }

    if (type === 'project') {
      items.push({ label: 'Back burner', icon: 'pi pi-clock', command: () => this.backburner(node) });
    }
    return items;
  }
  openNotes(node: TreeNode<any>): void {
    throw new Error('Method not implemented.');
  }
  backburner(node: TreeNode<any>): void {
    throw new Error('Method not implemented.');
  }
  markDone(node: TreeNode<any>): void {
    throw new Error('Method not implemented.');
  }
  plan(node: TreeNode<any>): void {
    throw new Error('Method not implemented.');
  }
  addChild(node: TreeNode<any>): void {
    throw new Error('Method not implemented.');
  }
  openSettings(node: TreeNode<any>): void {
    throw new Error('Method not implemented.');
  }
  delete(node: TreeNode<any>): void {
    throw new Error('Method not implemented.');
  }
}