import { Component, effect, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { category, event, project, subtask, task } from '../models/data.models';
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


@Component({
  selector: 'app-masterlist',
  imports: [
    CommonModule,
    TreeTableModule,
    ButtonModule,
    SpeedDialModule
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
  masterlistNode: TreeNode<category | project | task | subtask | event>[] = [];
  hoveredRow: TreeNode<any> | null = null;


  constructor(private store: Store<AppState>, private breakpoint: BreakpointObserver) {

    this.breakpoint.observe([Breakpoints.Handset])
      .subscribe(res => this.isMobile = res.matches);
    effect(() => {
      this.store.dispatch(LoadCategories());
      this.store.dispatch(LoadProjects());
      this.store.dispatch(LoadTasks());
      this.store.dispatch(LoadSubtasks());
      this.store.dispatch(LoadEvents())
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
      this.buildMasterlist();
      console.log(this.masterlistNode);
    })
  }


  buildMasterlist() {
    this.masterlistNode = [];
    this.categories().forEach(c => this.makeNode(c))
    this.projects().forEach(c => this.makeNode(c))
    this.tasks().forEach(c => this.makeNode(c))
    this.subtasks().forEach(c => this.makeNode(c))
  }


  //recursive function to build the tree structure, my pride and joy
  makeNode(n: category | project | task | subtask) {
    if ('ParentTask' in n) {
      const nodeN: TreeNode<category | project | task | subtask | event> = {
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
    } else if ('ParentCategory' in n && 'ParentProject' in n) {
      const nodeN: TreeNode<category | project | task | subtask | event> = {
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
        this.masterlistNode.find(treenode => treenode.data === p!)?.children?.push(nodeN)

      } else {
        this.masterlistNode.push(nodeN)
      }
    } else if ('ParentCategory' in n && 'BackBurner' in n) {
      const nodeN: TreeNode<category | project | task | subtask | event> = {
        label: n.Title,
        type: 'project',
        data: n,
        children: [],
        icon: "pi pi-flag"

      }
      if (n.ParentCategory !== null) {
        const p = this.categories().find(t => t.id === n.ParentCategory)
        if (!this.masterlistNode.find(treenode => treenode.data === p!)) {
          this.makeNode(p!)
        }
        this.masterlistNode.find(treenode => treenode.data === p!)?.children?.push(nodeN)
      } else {
        this.masterlistNode.push(nodeN)
      }
    } else if (!('Priority' in n)) {
      const nodeN: TreeNode<category | project | task | subtask | event> = {
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
        this.masterlistNode.find(treenode => treenode.data === p!)?.children?.push(nodeN)

      } else {
        this.masterlistNode.push(nodeN)
      }
    }
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

    console.log(items);
    return items;
  }
  openNotes(node: TreeNode<any>): void {
    throw new Error('Method not implemented.');
  }
  backburner(node: TreeNode<any>): void {
   
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